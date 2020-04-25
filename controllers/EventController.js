const mongoose = require("mongoose");
require("../models/User");

const User = mongoose.model("User");
require("../models/Event");
const Event = mongoose.model("Event");
require("../models/Modality");
const Modality = mongoose.model("Modality");

module.exports = {
  create(req, res) {
    const {
      user,
      title,
      description,
      address,
      date,
      hour,
      modality,
      private,
    } = req.body;

    const formatDate = date.split("-");

    const thumbnail = req.file.filename;

    User.findById({ _id: user })
      .then((user) => {
        Event.findOne({ title })
          .then((event) => {
            if (!event) {
              Modality.findOne({ name: modality })
                .then((modality) => {
                  const newEvent = new Event({
                    user,
                    title,
                    thumbnail: `/uploads/${thumbnail}`,
                    description,
                    address,
                    date:
                      formatDate[2] + "/" + formatDate[1] + "/" + formatDate[0],
                    hour,
                    modality,
                    private,
                  });

                  newEvent
                    .save()
                    .then(() => {
                      req.flash("success_msg", "Evento cadastrado com sucesso");
                      res.redirect("/home");
                    })
                    .catch((error) => {
                      req.flash(
                        "error_msg",
                        "Erro ao cadastrar o evento, tente novamente"
                      );
                      res.redirect("/new-event");
                    });
                })
                .catch((error) => {
                  req.flash(
                    "error_msg",
                    "Erro ao carregar dados, tente novamente"
                  );
                  res.redirect("/new-event");
                });
            } else {
              req.flash(
                "error_msg",
                "Evento já cadastrado com esse título, tente novamente!"
              );
              res.redirect("/new-event");
            }
          })
          .catch((error) => {
            req.flash("error_msg", "Erro ao carregar dados, tente novamente!");
            res.redirect("/new-event");
          });
      })
      .catch((error) => {
        req.flash("error_msg", "Usuário inválido");
        res.redirect("/");
      });
  },
};
