const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const AuthenticationController = require("../controllers/AuthenticationController");

// Usuários:
router.post("/new-user", UserController.create);

// Login:
router.post("/auth", AuthenticationController.create);

module.exports = router;
