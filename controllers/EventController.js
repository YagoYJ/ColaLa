const mongoose = require("mongoose");
require("../models/User");

const User = mongoose.model("User");
const joi = require("joi");
require("../models/Event");
const Event = mongoose.model("Event");
require("../models/Modality");
const Modality = mongoose.model("Modality");

module.exports = {
  async create(req, res) {
    const schema = joi.object().keys({
      user: joi.string().min(24).max(24).required(),
      title: joi.string().max(30).required(),
      thumbnail: joi.binary(),
      description: joi.string().required(),
      address: joi.string().required(),
      date: joi.string().required(),
      hour: joi
        .string()
        .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
        .required(),
      private: joi.boolean().required(),
      modality: joi.string().min(3).required(),
    });

    await joi.validate(req.body, schema, (err, result) => {
      if (err) {
        if (
          err.message ==
          'child "title" fails because ["title" length must be less than or equal to 30 characters long]'
        ) {
          req.flash("error_msg", "Título inválido.");
          res.redirect("/new-event");
        } else if (
          err.message ==
          'child "thumbnail" fails because ["thumbnail" is required]'
        ) {
          req.flash("error_msg", "É preciso adicionar uma imagem de thumbnail");
          res.redirect("/new-event");
        } else if (
          err.message ==
          'child "description" fails because ["description" is not allowed to be empty]'
        ) {
          req.flash("error_msg", "O evento deve possuir uma descrição.");
          return res.redirect("/new-event");
        } else if (
          err.message ==
          'child "date" fails because ["date" is not allowed to be empty]'
        ) {
          req.flash("error_msg", "Data Inválida");
          res.redirect("/new-event");
        } else if (
          err.message ==
          'child "hour" fails because ["hour" is not allowed to be empty]'
        ) {
          req.flash("error_msg", "Hora Inválida");
          res.redirect("/new-event");
        } else if (
          err.message ==
          'child "hour" fails because ["hour" with value "' +
            req.body.hour +
            '" fails to match the required pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/]'
        ) {
          req.flash("error_msg", "Hora Inválida");
          res.redirect("/new-event");
        } else if (
          err.message ==
          'child "modality" fails because ["date" is not allowed to be empty]'
        ) {
          req.flash("error_msg", "Selecione uma modalidade.");
          res.redirect("/new-event");
        } else if (
          err.message ==
          'child "private" fails because ["private" is not allowed to be empty]'
        ) {
          req.flash("error_msg", "Informe a privacidade do evento.");
          res.redirect("/new-event");
        }
      }
    });

    if (
      req.file == null ||
      req.file == "" ||
      typeof req.file == undefined ||
      !req.file
    ) {
      req.flash("error_msg", "É necessário uma imagem de Thumbnail");
      return res.redirect("/new-event");
    }

    var { date } = req.body;
    const formatDate = date.split("-");
    date = formatDate[2] + "/" + formatDate[1] + "/" + formatDate[0];
    const user = res.locals.user.id;

    const { title, description, address, hour, private, modality } = req.body;

    const thumbnail = req.file.filename;

    User.findById({ _id: user })
      .then((user) => {
        Event.findOne({ title: title })
          .then((event) => {
            if (!event) {
              Modality.findOne({ name: modality })
                .then((modality) => {
                  if (modality) {
                    const newEvent = new Event({
                      user,
                      title,
                      thumbnail: `/uploads/${thumbnail}`,
                      description,
                      address,
                      date,
                      hour,
                      modality,
                      private,
                    });

                    newEvent
                      .save()
                      .then(() => {
                        req.flash(
                          "success_msg",
                          "Evento cadastrado com sucesso"
                        );
                        res.redirect("/home");
                      })
                      .catch((error) => {
                        req.flash(
                          "error_msg",
                          "Erro ao cadastrar o evento, tente novamente"
                        );
                        res.redirect("/new-event");
                      });
                  } else {
                    req.flash("error_msg", "Modalidade indisponível");
                  }
                })
                .catch((error) => {
                  req.flash(
                    "error_msg",
                    "Erro ao carregar dados, tente novamente" + error
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
