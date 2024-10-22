const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userModel = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "username already in use"],
        requared: [true, "username is Required"],
        minLength: [3, "username Contain atleast 3 character"],
        maxLength: [20, "username Contain atleast 20 character"]
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more than 15 characters"],
        minLength: [5, "Password should have atleast 5 characters"]
        // match[]
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task'
        }
    ]

});

userModel.pre("save", function () {
    if (!this.isModified("password")) return;
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

userModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userModel.methods.getJWTToken = function () {
    const jwtToken = JWT.sign({ id: this._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE
    })
    return jwtToken;
}

module.exports = mongoose.model("user", userModel);