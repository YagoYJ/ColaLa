const { Router } = require("express");
const routes = Router();

// GET:
// Tela de login:
routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/Login/login.html");
});

// Tela de cadastro de usuário:
routes.get("/new-user", (req, res) => {
  res.sendFile(__dirname + "/view/New_User/newUser.html");
});

// POST:
// Autenticação de login:
routes.post("/", (req, res) => {});

//Validação de cadastro de usuário:
routes.post("/new-user", (req, res) => {});

module.exports = routes;
