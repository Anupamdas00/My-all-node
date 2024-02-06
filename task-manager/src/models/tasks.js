const { Schema, mongoose } = require("mongoose");



const schema = new Schema({
    title : {
        type : String,
        trim : true,
        default : ''
    },
    description : {
        type : String,
        trim : true,
        required : true
    }, 
    completed : {
        type : Boolean,
        default : false
    },
    creatorId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Users'
    },
    creatorName : {
        type : String,
        required : true,
        ref : 'Users'
    }
}, {
    timestamps : true,
})

const Task = mongoose.model('Tasks', schema);

module.exports = Task;