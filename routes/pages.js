const express = require("express");
const { isLogged } = require("../helpers/logged");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/login", {
    style: "login.css",
  });
});

router.get("/new-user", (req, res) => {
  res.render("pages/newUser", {
    style: "newUser.css",
  });
});

router.get("/forgot-password", (req, res) => {
  res.render("pages/forgotPassword", {
    style: "forgotPassword.css",
  });
});

router.get("/reset-password", (req, res) => {
  res.render("pages/resetPassword", {
    style: "resetPassword.css",
  });
});

router.get("/home", isLogged, (req, res) => {
  res.render("pages/home", {
    style: "home.css",
  });
});

module.exports = router;
