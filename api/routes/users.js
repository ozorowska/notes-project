const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/register", userController.user_add_new);

router.post("/login", userController.user_login);

module.exports = router;
