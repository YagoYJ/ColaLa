// IMPORTAÇÕES DE MÓDULOS:
const express = require("express");
const mongoose = require("mongoose");

// IMPORTAÇÕES INTERNAS:
const app = express();
const routes = require("./routes");

// CONFIGURAÇÕES:
app.use(express.json());
app.use(routes);

// app.use(express.static(path.join(__dirname, "../../frontend")));

// CONEXÃO COM O BD:
// mongoos.connect("", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

//ROTAS
app.get("/", (req, res) => {
  res.send("Opa");
});

// PORTA DE CONEXÃO:
app.listen(8081, () => {
  console.log("Server rodando...");
});
