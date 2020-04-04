// MÓDULOS:

const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const pagesRoutes = require("./routes/pages");
const backendRoutes = require("./routes/backend");

const app = express();

// BODY-PARSER:

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HANDLEBARS:

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// MONGOOSE:

const connection = require("./database/connection");
connection.connect();

// ESTILIZAÇÕES:

app.use(express.static(path.join(__dirname, "public")));

// ROTAS:

app.use("/", pagesRoutes);
app.use("/backend", backendRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log("Server started");
});
