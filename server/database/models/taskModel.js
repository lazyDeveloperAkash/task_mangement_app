const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "title already in use"],
        requared: [true, "title is Required"],
        minLength: [3, "title Contain atleast 3 character"],
        maxLength: [20, "title Contain atleast 20 character"]
    },
    description: {
        type: String,
        required: [true, "description is required"],
        minLength: [5, "description Contain atleast 5 character"],
        maxLength: [70, "description Contain atleast 70 character"]
    },
    status: {
        type: String,
        default: "Pending",
        anum: ["Pending", "Progress", "Completed"]
    },
    dueDate: {
        type: Date,
        required: [true, "dueDate is required"],

    }

});

module.exports = mongoose.model("task", taskModel);