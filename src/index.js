// IMPORTAÇÕES DE MÓDULOS:
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// IMPORTAÇÕES INTERNAS:
const app = express();
const routes = require("./routes");

// CONFIGURAÇÕES:
app.use(express.json());
app.use(routes);

// bodyparser:
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CONEXÃO COM O BD:
mongoose
  .connect(
    "mongodb+srv://admin:colalaably1234@colala-bhonx.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Conected with ColaLa database");
  })
  .catch(error => {
    console.log("Error to conect with ColaLa database -> " + error);
  });

//Estilizações:
app.use(express.static(path.join(__dirname, "/view")));
app.use(express.static(path.join(__dirname, "/view/Login")));
app.use(express.static(path.join(__dirname, "/view/New_User")));

// PORTA DE CONEXÃO:
app.listen(3333, () => {
  console.log("Server started...");
});
