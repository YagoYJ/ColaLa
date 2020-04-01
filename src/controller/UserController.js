const mongoose = require("mongoose");
const joi = require("joi");
require("../model/User");
const User = mongoose.model("User");

module.exports = {
  async index(req, res) {},
  async create(req, res) {
    console.log(req.body);

    const schema = joi.object().keys({
      user: joi
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
        return res.send("Usuário ou senha inválidos");
      } else {
        res.send("Login realizado com sucesso.");
      }
    });
  }
};
