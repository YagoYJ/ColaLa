const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/login",{
    style: "login.css"
  });
});

router.get("/new-user", (req, res) => {
  res.render("pages/newUser",{
    style: "newUser.css"
  });
});

router.get("/home", (req, res) => {
  res.render("pages/home",{
    style: "home.css"
  });
});

module.exports = router;
