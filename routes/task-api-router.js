const express = require('express');

const TaskModel = require('../models/task-model');
const UserModel= require('../models/user-model');


const router = express.Router();

//GET the tasks
router.get('/tasks',(req, res, next)=>{

  TaskModel
  // get teh task from the user that creted it
  .find({owner:req.user._id})
  // .find()
  .sort({createdAt: -1})
  .limit(10)
  .exec()
  .then((taskResults)=>{
    res.status(200).json(taskResults);
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({ error: "Task list database error" });

  });

});

//POST the task
router.post('/tasks',(req, res, next)=>{

  console.log("the req.user is " + req.user);
  const theTask = new TaskModel({
    name: req.body.name,
    owner: req.user._id



  });
  theTask.save()
  .then(()=>{
    res.status(200).json(theTask);
  })
  .catch((err)=>{
    console.log("post /taks error");
    console.log(err);
    // 400 status code if validation error
        if (err.errors) {
            // respond with an VALIDATION ERRORS in the JSON format
            res.status(400).json(err.errors);
        }
        else {
            // respond with an ERROR MESSAGE in the JSON format
            res.status(500).json({ error: "Task save database error" });
        }

  });


});

router.delete('/tasks/:id',(req,res,next)=>{


      TaskModel.findByIdAndRemove(req.params.id)
        .then((tasksFromDb) => {
            if (tasksFromDb === null) {
                // respond with an ERROR MESSAGE in the JSON format
                res.status(404).json({ error: "Task not found" });
            }
            else {
                // respond with the QUERY RESULTS in the JSON format
                res.status(200).json(tasksFromDb);
            }
        })
        .catch((err) => {
            console.log("DELETE /tasks/:id ERROR!");
            console.log(err);

            // respond with an ERROR MESSAGE in the JSON format
            res.status(500).json({ error: "task delete database error" });
        });
});





module.exports= router;
