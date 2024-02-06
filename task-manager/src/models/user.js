const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./tasks')


const schema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        default : 0
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid!')
            }   
        }
    },    
    password : {
        type : String,
        required : true,
        trim : true,
        minLength: [6, 'Min length of password should be atleast 6'],
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain "password" as password!')
            }
        }
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    avatar : {
        type : Buffer
    }
}, {
    timestamps : true,
})

schema.virtual('tasks', {
    ref : 'Tasks',
    localField : '_id',
    foreignField : 'creatorId',
})

schema.methods.toJSON = function(){
    const user = this;
    userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

schema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET_STRING );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}


schema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}


//hash password before saving
schema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){ 
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

// deletes all task of a user if the user is deleted-----------
schema.pre('deleteOne', { document: true, query: false }, async function(next){
    const user = this;
    await Task.deleteMany({ creatorId : user._id });
    next()
})

const User = mongoose.model('Users', schema);

module.exports = User;