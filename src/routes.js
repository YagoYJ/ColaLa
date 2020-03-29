const { Router } = require("express");
const UserController = require("./controller/UserController");
const SessionController = require("./controller/SessionController");
const bodyParser = require("body-parser")
const Joi = require('joi');

const routes = Router();

// Body Parser
routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

// Back-end:

// GET:
// Usuários:
routes.get("/users", UserController.index);

// POST:
// Autenticação de login:
routes.post("/session", SessionController.create);

// Validação de login:
routes.post("/login", (req, res) => {
  console.log(req.body);

  const schema = Joi.object().keys({
    nickname: Joi.string().trim().min(5).required(),
    password: Joi.string().min(8).required()
  });

  Joi.validate(req.body, schema, (err, result) =>{
    if(err){
      console.log(err)
      return res.send("Usuário ou senha inválidos");
    } else {
      res.send('Login realizado com sucesso.');
    }
  })

  // database code will go below


});

//Validação de cadastro de usuário:
routes.post("/new-user", (req, res) => {});

// Front-end:

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
