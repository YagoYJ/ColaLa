const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadConfig = require("../config/upload");
const upload = multer(uploadConfig);

const UserController = require("../controllers/UserController");
const LoginController = require("../controllers/LoginController");
const ForgotPasswordController = require("../controllers/ForgotPasswordController");
const ResetPasswordController = require("../controllers/ResetPasswordController");
const EventController = require("../controllers/EventController");
const ParticipateController = require("../controllers/ParticipateController");

const mongoose = require("mongoose");
require("../models/Modality");
const Modality = mongoose.model("Modality");

// Usuários:
router.post("/new-user", upload.single("avatar"), UserController.create);

// Login:
router.post("/login", LoginController.create);

// Esqueci minha senha:
router.post("/forgot-password", ForgotPasswordController.create);

// Reset da senha:
router.post("/reset-password", ResetPasswordController.create);

// Cadastro de evento
router.post("/new-event", upload.single("thumbnail"), EventController.create);

// Participar de evento:
router.post("/participate", ParticipateController.create);

// Logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "Você foi deslogado");
  res.redirect("/");
});

module.exports = router;
