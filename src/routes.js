const { Router } = require("express");
const bodyparser = require("body-parser");

const UserController = require("./controller/UserController");
const SessionController = require("./controller/SessionController");

const routes = Router();

// bodyparser:
routes.use(bodyparser.urlencoded({ extended: false }));
routes.use(bodyparser.json());


// BACK-END:

// Usuários:
routes.get("/users", UserController.index);
routes.post("/new-user", UserController.create);

// Login:
routes.post("/session", SessionController.create);

// FRONT-END:

// Tela de login:
routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/Login/login.html");
});

// Tela de cadastro de usuário:
routes.get("/new-user", (req, res) => {
  res.sendFile(__dirname + "/view/new_user/newUser.html");
});

module.exports = routes;
