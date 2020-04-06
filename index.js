// MÓDULOS:

const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

require("./config/auth")(passport);

const pagesRoutes = require("./routes/pages");
const backendRoutes = require("./routes/backend");

const app = express();

// SESSION:

app.use(
  session({
    secret: "72186cc0c6b187acbd99d7602122805c",
    resave: true,
    saveUninitialized: true,
  })
);

// PASSPORT:

app.use(passport.initialize());
app.use(passport.session());

// CONNECT-FLASH:

app.use(flash());

// MIDDLEWARES:

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

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
