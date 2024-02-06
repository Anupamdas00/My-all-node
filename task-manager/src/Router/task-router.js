const express = require("express");
const Task = require("../models/tasks");
const auth = require("../middleware/auth");

const router = express.Router();
const app = express();
app.use(express.json());


// get all task with no auth (testing purpose)

router.get('/all-tasks', async (req, res) => {
  try{
    const task =await Task.find({});
    res.send(task);
  }catch(e){
    res.status(500).send(e)
  }
})

// create task for loggedIn user-------------
router.post("/task", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    creatorId: req.user._id,
    creatorName : req.user.name
  }); 
  try {
    const taskData = await task.save();
    res.status(200).send(taskData);
  } catch (e) {
    res.status(500).send(e);
  }
});


// show created task for loggedin user---------------
//task/my-task?completed=true/false gives result accordingly
// limit&skip provided in query it is a string so to convert it to number we use parshInt()
// sort : createdAt:asc(-1) or desc(1) 
//task/my-task?sortBy=createdAt:asc or dsc
router.get("/task/my-task", auth, async (req, res) => {
  const match = {}
  const sort = {}
  if(req.query.completed){
    match.completed = req.query.completed === 'true';
  }

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user.populate([{ 
      path : 'tasks',
      match,
      options : {
        limit : parseInt(req.query.limit),
        skip : parseInt(req.query.skip),
        sort,
      }
     }]);
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, createdBy: req.user._id });
    if (!task) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const taskToUpdate = Object.keys(req.body);
  const allowedToUpdate = ["title", "description", "completed"];
  const isValidToUpdate = taskToUpdate.every((item) =>
    allowedToUpdate.includes(item)
  );

  if (!isValidToUpdate) {
    return res.status(500).send("Invalid Request!");
  }
  try {
    const task = await Task.findOne({ _id: req.params.id, creatorId: req.user._id });
    if (!task) {
      return res.status(400).send();
    }
    taskToUpdate.forEach(taskKey => task[taskKey] = req.body[taskKey]);
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
