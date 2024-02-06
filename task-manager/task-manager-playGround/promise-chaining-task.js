require('../src/db/mongoose');
const Task = require('../src/models/tasks');

// Task.findByIdAndDelete('64c4b8386732d7c7b176637c').then((data) => {
//     console.log('Deleted data', data);

//     return Task.countDocuments({ completed : true })
// }).then((result) => console.log(result)).catch(err => console.log(err))


const deleteTaskAndCount = async (id, isComplete) => {
    const task = await Task.findByIdAndDelete(id);
    const noOfCompleteTask = await Task.countDocuments({ completed : isComplete });
    return noOfCompleteTask;
}


deleteTaskAndCount('64c4843bc5fdbacdb8b67432', true).then((result) => {
    console.log(result)
}).catch((error) => console.log(error))