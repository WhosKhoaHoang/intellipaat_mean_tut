const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");

const PORT = 3000;
const List = require("./database/models/list.js");
const Task = require("./database/models/task.js");

// ========== MIDDLEWARE BEGIN ========== //
/*
CORS - Cross Origin Resource Sharing
. Need to enable CORS on this here server side due
  to the following arrangement:
    localhost:3000 --> backend API
    localhost:4200 --> frontend
  the frontend will make API requests to the backend,
  but if CORS was DISABLED, then the the request
  would be blocked.
*/

//Alternatively, you could install a library for handling
//CORS and then say something like this:
//  var cors = require('cors');
//  app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//For parsing incoming requests as JSON
app.use(express.json());
// ========== MIDDLEWARE END ========== //

//TODO: Refactor then(), catch() code so that you don't have to
//      to write these instructions all the time. TIP: Implement
//      a function that takes a function corresponding to the
//      appropriate HTTP method?
// ========== ROUTES BEGIN ========== //
// ----- LISTS ----- //
app.get("/lists", (req, res) => {
    List.find({})
        .then((lists) => res.send(lists))
        .catch((error) => console.log(error));
});

app.get("/lists/:listId", (req, res) => {
    List.find({ _id: req.params.listId })
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.post("/lists", (req, res) => {
    (new List({ "title": req.body.title }))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.patch("/lists/:listId", (req, res) => {
    List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.delete("/lists/:listId", (req, res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({ _listId: list._id })
            .then(() => list)
            .catch((error) => console.log("error"));
    }

    List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(deleteTasks(list)))
        .catch((error) => console.log("error"));
});

// ----- TASKS ----- //
app.get("/lists/:listId/tasks", (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log("error"));
});

app.post("/lists/:listId/tasks", (req, res) => {
    (new Task({ title: req.body.title, _listId: req.params.listId }))
        .save()
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body })
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});
// ========== ROUTES END ========== //


app.listen(PORT, ()=>console.log("Server is connected on port "+PORT))
