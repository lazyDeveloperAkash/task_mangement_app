const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require("../database/models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const taskModel = require("../database/models/taskModel");
const mongoose = require("mongoose");

exports.getTasks = catchAsyncErrors(async (req, res, next) => {
    const { tasks } = await userModel.findById(req.id).populate('tasks');
    res.status(200).json({ success: true, tasks })
});

exports.getOneTask = catchAsyncErrors(async (req, res, next) => {
    const task = await taskModel.findById(req.params.id);
    res.status(200).json({ success: true, task })
});

exports.createTask = catchAsyncErrors(async (req, res, next) => {
    const { _id } = await new taskModel(req.body).save();
    //add taskid to user's tasks array
    await userModel.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.id) }
        },
        {
            $addFields: {
                tasks: { $concatArrays: ['$tasks', [new mongoose.Types.ObjectId(_id)]] }
            }
        },
        {
            $merge: {
                into: "users",
                whenMatched: "replace",
                whenNotMatched: "fail"
            }
        }
    ]);
    res.status(201).json({ success: true, message: "task created sucessfully!" })
});

exports.editTask = catchAsyncErrors(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler("invalid task id", 400));
    }
    const task = await taskModel.findOneAndUpdate({ _id: req.params.id }, req.body);

    if (!task) return next(new ErrorHandler("task not found", 404))

    res.status(200).json({ success: true, message: "task edited sucessfully!" })
});

exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler("invalid task id", 400));
    }
    const task = await taskModel.findByIdAndDelete(req.params.id);
    if (!task) return next(new ErrorHandler("task not found", 404))
    //remove taskid from user's tasks array
    await userModel.updateOne(
        { _id: req.id },
        {
            $pull: { tasks: req.params.id }
        }
    );
    res.status(200).json({ success: true, message: "task deleted sucessfully!" })
});
