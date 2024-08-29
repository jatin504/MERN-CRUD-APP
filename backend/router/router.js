const express = require('express')

const router = express.Router();

const posttdo = require("../controllers/user.todopost.controller")

const gettodo = require("../controllers/user.todoget.controller")

const tododelete = require("../controllers/user.tododelete.controller")

const TodoUpdate = require("../controllers/user.todoupdate.controller")

router.post("/posttdo",posttdo)

router.get("/gettodo",gettodo)

router.delete("/delete/:id", tododelete);

router.put("/todoupdate/:id", TodoUpdate)

module.exports = router

