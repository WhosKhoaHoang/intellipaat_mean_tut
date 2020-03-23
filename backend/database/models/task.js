const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 3
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false, //I.e., default value
        required: true
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
