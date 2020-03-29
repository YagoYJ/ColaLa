const { Router } = require("express");
const UserController = require("./controller/UserController");
const SessionController = require("./controller/SessionController");

const routes = Router();

// Back-end:

// GET:
// Usuários:
routes.get("/users", UserController.index);

// POST:
// Autenticação de login:
routes.post("/session", SessionController.create);

//Validação de cadastro de usuário:
routes.post("/new-user", (req, res) => {});

// Fornt-end:

// GET
// Tela de login:
routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/Login/login.html");
});

// Tela de cadastro de usuário:
routes.get("/new-user", (req, res) => {
  res.sendFile(__dirname + "/view/New_User/newUser.html");
});
module.exports = routes;
