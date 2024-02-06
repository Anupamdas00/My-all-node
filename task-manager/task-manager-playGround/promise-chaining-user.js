require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('64c489ed61deb0fd1b6be109', { age : 26 })
// .then((data) => {
//     return User.countDocuments({age : 26})
// }).then((result) => console.log(result))
// .catch((error) => console.log(error))

const  updateUserData = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const countData =await User.countDocuments({ age });
    return countData;
}

updateUserData('64c489ed61deb0fd1b6be109', 26).then((result) => {
    console.log(result);
}).catch((error) => console.log(error))