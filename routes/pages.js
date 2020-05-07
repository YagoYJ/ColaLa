const express = require("express");
const { isLogged } = require("../helpers/logged");

const mongoose = require("mongoose");
require("../models/Modality");
const Modality = mongoose.model("Modality");
require("../models/Event");
const Event = mongoose.model("Event");

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
  Event.find()
    .limit(3)
    .sort("date")
    .populate("user")
    .then((event) => {
      res.render("pages/home", {
        style: "home.css",
        event: event,
      });
    })
    .catch((error) => {
      req.flash("error_msg", "Não foi possível carregar os eventos");
      res.redirect("/home");
    });
});

router.get("/new-event", isLogged, (req, res) => {
  Modality.find()
    .sort([["members", -1]])
    .then((modality) => {
      res.render("pages/newEvent", {
        style: "newEvent.css",
        modality: modality,
      });
    })
    .catch((error) => {
      req.flash("error_msg", "Erro ao carregar dados");
      res.redirect("/home");
    });
});

router.get("/events", isLogged, (req, res) => {
  Event.find()
    .sort([["members", -1]])
    .populate("user")
    .then((event) => {
      res
        .render("pages/events", {
          style: "events.css",
          event: event,
        })
        .catch((error) => {
          req.flash("error_msg", "Não foi possível carregar os eventos");
          res.redirect("/home");
        });
    });
});

module.exports = router;
