const JWT = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { jwtToken } = req.cookies;

    if (!jwtToken) {
        return next(new ErrorHandler("Please login to eccess the resource", 401));
    }
    const { id } = JWT.verify(jwtToken, process.env.TOKEN_SECRET);
    if (!id) {
        return next(new ErrorHandler("Please provide a valide token!", 401));
    }
    req.id = id;
    next();
})