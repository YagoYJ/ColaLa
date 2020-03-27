const { Router } = require("express");
const routes = Router();

// GET:

routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/Login/login.html");
});

routes.get("/new-user", (req, res) => {
  res.sendFile(__dirname + "/view/New_User/newUser.html");
});

module.exports = routes;
