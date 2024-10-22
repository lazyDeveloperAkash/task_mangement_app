const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { signup, signin, signout, loggedinUser } = require("../controllers/userController");

router.get('/', isAuthenticated, loggedinUser);

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/signout/:id', signout);

module.exports = router;