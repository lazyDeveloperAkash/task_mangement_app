const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { getTasks, createTask, editTask, deleteTask, getOneTask } = require("../controllers/taskController");

router.get('/tasks',isAuthenticated, getTasks);

router.get('/:id',isAuthenticated, getOneTask);

router.post('/', isAuthenticated, createTask);

router.put('/:id',isAuthenticated, editTask);

router.delete('/:id',isAuthenticated, deleteTask);

module.exports = router;