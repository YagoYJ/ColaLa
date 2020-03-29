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

// CONEXÃO COM O BD:

//Estilizações:
app.use(express.static(path.join(__dirname, "/view")));
app.use(express.static(path.join(__dirname, "/view/Login")));
app.use(express.static(path.join(__dirname, "/view/New_User")));

// PORTA DE CONEXÃO:
app.listen(3333, () => {
  console.log("Server started...");
});
