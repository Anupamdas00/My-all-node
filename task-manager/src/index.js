const express = require("express");
const userRouter = require('./Router/user-router');
const taskRouter = require("./Router/task-router");
require("./db/mongoose");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Task Manager App</h1>");
});

app.listen(port, () => {
  console.log("Server is running on port" +" "+ port);
});



// const Task = require('./models/tasks')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('64d3d801b6dcbd3c8689c954')
//     // await task.populate([{ path: 'creatorId' }])
//     // console.log(task)

//     const user = await User.findById('64d3d7f4b6dcbd3c8689c949')
//     await user.populate([{ path : 'task'}])
//     console.log(user.task)
// }

// main()