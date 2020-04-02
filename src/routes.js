const { Router } = require("express");
const bodyParser = require("body-parser");

const UserController = require("./controller/UserController");
const AuthenticationController = require("./controller/AuthenticationController");

const routes = Router();

// Body Parser
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

// BACK-END:

// Usuários:
routes.post("/new-user", UserController.create);

// Login:
routes.post("/auth", AuthenticationController.create);

// FRONT-END:

// Login:
routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/login/login.html");
});

// New user:
routes.get("/new-user", (req, res) => {
  res.sendFile(__dirname + "/view/new_user/newUser.html");
});

// Home:
routes.get("/home", (req, res) => {
  res.sendFile(__dirname + "/view/home/home.html");
});

module.exports = routes;
