const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("User");
require("../models/Event");
const Event = mongoose.model("Event");
require("../models/Modality");
const Modality = mongoose.model("Modality");

module.exports = {
  create(req, res) {
    console.log(req.body);
    req.flash(
      "success_msg",
      `Evento cadastrado com sucesso:\n Título: ${req.body.title}, Descrição: ${req.body.description}, Endereço: ${req.body.address}, Data: ${req.body.date}, Hora: ${req.body.hour}, Privado: ${req.body.private}`
    );
    res.redirect("/home");
  },
};
