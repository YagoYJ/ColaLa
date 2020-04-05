const mongoose = require("mongoose");
const joi = require("joi");
require("../models/User");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const schema = joi.object().keys({
      nickname: joi.string().trim().min(5).required(),
      bio: joi.string().allow(""),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      confirmPass: joi.ref("password"),
    });

    joi.validate(req.body, schema, (err, result) => {
      if (err) {
        if (
          err.message ==
          'child "nickname" fails because ["nickname" length must be at least 5 characters long]'
        ) {
          req.flash("error_msg", "Nome de usuário inválido.");
          res.redirect("/new-user");
        } else if (
          err.message ==
          'child "password" fails because ["password" length must be at least 8 characters long]'
        ) {
          req.flash(
            "error_msg",
            "A senha deve conter pelo menos 8 caracteres."
          );
          res.redirect("/new-user");
        } else if (
          err.message ==
          'child "password" fails because ["password" is not allowed to be empty]'
        ) {
          req.flash("error_msg", "Senha inválida.");
          res.redirect("/new-user");
        } else if (
          err.message ==
          'child "confirmPass" fails because ["confirmPass" must be one of [ref:password]]'
        ) {
          req.flash("error_msg", "Ambas as senhas devem ser iguais");
          res.redirect("/new-user");
        } else if (
          err.message ==
          'child "email" fails because ["email" must be a valid email]'
        ) {
          req.flash("error_msg", "E-mail inválido.");
          res.redirect("/new-user");
        }
      } else {
        const { nickname, email, bio, password } = req.body;

        User.findOne({ nickname: nickname })
          .then((user) => {
            if (user) {
              req.flash("error_msg", "Usuário já cadastrado");
              res.redirect("/new-user");
              return;
            } else {
              User.findOne({ email: email })
                .then((user) => {
                  if (user) {
                    req.flash("error_msg", "E-mail já cadastrado");
                    res.redirect("/new-user");
                    return;
                  } else {
                    const newUser = new User({
                      nickname,
                      email,
                      bio,
                      password,
                    });
                    
                    bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) {
                          req.flash("error_msg", "Erro ao encriptar sua senha");
                          res.redirect("/new-user");
                          return;
                        } else {
                          newUser.password = hash;
                          
                          newUser
                          .save()
                            .then(() => {
                              req.flash(
                                "success_msg",
                                "Usuário cadastrado com sucesso"
                              );
                              res.redirect("/");
                            })
                            .catch((error) => {
                              req.flash(
                                "error_msg",
                                "Erro ao salvar o usuário no banco de dados"
                                );
                                res.redirect("/new-user");
                              });
                            }
                          });
                    });
                  }
                })
                .catch((error) => {
                  req.flash(
                    "error_msg",
                    "Erro ao salvar o usuário no banco de dados"
                    );
                  res.redirect("/new-user");
                });
            }
          })
          .catch((error) => {
            req.flash(
              "error_msg",
              "Erro ao salvar o usuário no banco de dados"
            );
            res.redirect("/new-user");
          });
      }
    });
  },
};
