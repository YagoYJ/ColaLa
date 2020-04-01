const mongoose = require("mongoose");
const joi = require("joi");
require("../model/User");
const User = mongoose.model("User");

module.exports = {
  async index(req, res) {},
  async create(req, res) {
    console.log(req.body);

    const schema = joi.object().keys({
      nickname: joi
        .string()
        .trim()
        .min(5)
        .required(),
      password: joi
        .string()
        .min(8)
        .required()
    });

    joi.validate(req.body, schema, (err, result) => {
      if (err) {
        console.log(err);
        if(err.message == 'child "nickname" fails because ["nickname" length must be at least 5 characters long]'){
          res.send('Usuário inválido.')
        } else if(err.message == 'child "password" fails because ["password" length must be at least 8 characters long]'){
          res.send('Senha inválida.')
        } else {
          res.send('Usuário ou Senha inválidos.')
        }
      } else {
        res.send("Login realizado com sucesso.");
      }
    });
  }
};
