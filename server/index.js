require('dotenv').config({ path: './.env' })
const express = require('express');
const app = express();

//database
require("./database/database.js").connectDatabase();

//logger creation
const logger = require('morgan');
app.use(logger('tiny'));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: 'https://task-mangement-app--seven.vercel.app'
}))

//cookie paeser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Routes
app.use("/api/user", require("./routes/userRoutes.js")); // user routes
app.use("/api/task", require("./routes/taskRoutes.js")); // task routes

//error handler
const ErrorHandler = require("./utils/ErrorHandler.js");
const { generatedeErrors } = require("./middlewares/error.js");
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`requist url not found ${req.url}`, 404));
});
app.use(generatedeErrors);

// create server
app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`))
