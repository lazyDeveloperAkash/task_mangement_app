const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require("../database/models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/token");

exports.loggedinUser = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findById(req.id).populate('tasks');
    res.status(200).json(user);
})

exports.signup = catchAsyncErrors(async (req, res, next) => {
    const user = await new userModel(req.body).save();
    console.log(user)
    sendToken(user, 201, res);
});

exports.signin = catchAsyncErrors(async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await userModel
        .findOne({ userName: userName })
        .select("+password")
        .populate('tasks');

    if (!user) {
        return next(
            new ErrorHandler(
                "User not found with this User Name!"
            )
        );
    }
    const isMatch = user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Wrong Password", 500));
    sendToken(user, 200, res);
});

exports.signout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('jwtToken').status(200).json({ message: "Successfully Singout!" });
});
