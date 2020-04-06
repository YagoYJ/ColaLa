const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const LoginController = require("../controllers/LoginController");

// Usuários:
router.post("/new-user", UserController.create);

// Login:
router.post("/login", LoginController.create);

module.exports = router;
