const mongoose = require("mongoose");

require("../models/User");
const User = mongoose.model("User");

require("../models/Event");
const Event = mongoose.model("Event");

module.exports = {
  async create(req, res) {
    const { event } = req.body;
    const user = res.locals.user.id;

    await User.findById(user)
      .populate("participations")
      .then((user) => {
        if (!user) {
          req.flash("error_msg", "Usuário inválido");
          res.redirect("/");
        } else {
          Event.findById(event)
            .then((event) => {
              if (!event) {
                req.flash("error_msg", "Evento inválido");
                res.redirect("back");
              } else {
                const member = event.members.find(
                  (member) => member == user.nickname
                );

                if (member) {
                  req.flash(
                    "error_msg",
                    "Você já está participando deste evento!"
                  );
                  res.redirect("back");
                } else {
                  event.members.push(user.nickname);
                  user.participations.push(event);

                  event
                    .save()
                    .then(() => {
                      user
                        .save()
                        .then(() => {
                          req.flash(
                            "success_msg",
                            "Você está participando do evento " + event.title
                          );
                          res.redirect("back");
                        })
                        .catch((error) => {
                          req.flash(
                            "error_msg",
                            "Não foi possível participar do evento, tente novamente!"
                          );
                          res.rediret("back");
                        });
                    })
                    .catch((error) => {
                      req.flash(
                        "error_msg",
                        "Não foi possível participar do evento, tente novamente!"
                      );
                      res.rediret("back");
                    });
                }
              }
            })
            .catch((error) => {
              req.flash("error_msg", "Erro ao autenticar o evento." + error);
              res.redirect("back");
            });
        }
      })
      .catch((error) => {
        req.flash("error_msg", "Erro ao autenticar o usuário." + error);
        res.redirect("back");
      });
  },
};
