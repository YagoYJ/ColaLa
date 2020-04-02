const mongoose = require("mongoose");
const joi = require("joi");
require("../model/User");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    console.log(req.body);

    const schema = joi.object().keys({
      nickname: joi
        .string()
        .trim()
        .min(5)
        .required(),
      bio: joi.string().allow(""),
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .min(8)
        .required(),
      confirmPass: joi.ref("password")
    });

    joi.validate(req.body, schema, (err, result) => {
      if (err) {
        console.log("Detalhes: ", err.message);
        if (
          err.message ==
          'child "nickname" fails because ["nickname" length must be at least 5 characters long]'
        ) {
          return res
            .status(401)
            .send("O usuário deve conter no mínimo 5 caracteres.");
        } else if (
          err.message ==
          'child "password" fails because ["password" length must be at least 8 characters long]'
        ) {
          return res
            .status(401)
            .send("A senha deve conter no mínimo 8 caracteres.");
        } else if (
          err.message ==
          'child "password" fails because ["password" is not allowed to be empty]'
        ) {
          return res
            .status(401)
            .send("A senha deve conter no mínimo 8 caracteres.");
        } else if (
          err.message ==
          'child "confirmPass" fails because ["confirmPass" must be one of [ref:password]]'
        ) {
          return res.status(401).send("Ambas as senhas devem ser iguais.");
        } else if (
          err.message ==
          'child "email" fails because ["email" must be a valid email]'
        ) {
          return res.status(401).send("Email inválido.");
        }
      } else {
        const { nickname, email, bio, password } = req.body;

        User.findOne({ nickname: nickname })
          .then(user => {
            if (user) {
              console.log("Usuário já cadastrado");
              res.redirect("/new-user");
            } else {
              User.findOne({ email: email })
                .then(user => {
                  if (user) {
                    console.log("E-mail já cadastrado");
                    res.redirect("/new-user");
                  } else {
                    const newUser = new User({
                      nickname,
                      email,
                      bio,
                      password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) {
                          console.log("Erro ao encriptar sua senha");
                          res.redirect("/new-user");
                        } else {
                          newUser.password = hash;

                          newUser
                            .save()
                            .then(() => {
                              console.log("Usuário cadastrado com sucesso.");
                              res.redirect("/");
                            })
                            .catch(error => {
                              console.log(
                                "Erro ao salvar o usuário no banco de dados"
                              );
                              res.redirect("/new-user");
                            });
                        }
                      });
                    });
                  }
                })
                .catch(error => {
                  console.log("Erro ao cadastrar o usuário");
                  res.redirect("/new-user");
                });
            }
          })
          .catch(error => {
            console.log("Erro ao cadastrar o usuário");
            res.redirect("/new-user");
          });
      }
    });
  }
};
