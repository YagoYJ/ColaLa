// IMPORTAÇÕES DE MÓDULOS:
const express = require("express");
const path = require("path");

// Conexão com o BD:
const connect = require("./database/connect");
connect.connection();

// IMPORTAÇÕES INTERNAS:
const app = express();
const routes = require("./routes");

// CONFIGURAÇÕES:
app.use(express.json());
app.use(routes);

//Estilizações:
app.use(express.static(path.join(__dirname, "/view")));
app.use(express.static(path.join(__dirname, "/view/login")));
app.use(express.static(path.join(__dirname, "/view/new_User")));

// PORTA DE CONEXÃO:
app.listen(3333, () => {
  console.log("Server started...");
});
