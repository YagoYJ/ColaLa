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
      bio: joi
        .string()
        .allow(''),
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .min(8)
        .required(),
      confirmPass: joi
        .ref('password')
    });

    joi.validate(req.body, schema, (err, result) => {
      if (err) {
        console.log('Detalhes: ', err.message);
        if(err.message == 'child "nickname" fails because ["nickname" length must be at least 5 characters long]'){
          return res.status(401).send('O usuário deve conter no mínimo 5 caracteres.')
        } else if(err.message == 'child "password" fails because ["password" length must be at least 8 characters long]'){
          return res.status(401).send('A senha deve conter no mínimo 8 caracteres.')
        } else if(err.message == 'child "password" fails because ["password" is not allowed to be empty]'){
          return res.status(401).send('A senha deve conter no mínimo 8 caracteres.')
        }else if(err.message == 'child "confirmPass" fails because ["confirmPass" must be one of [ref:password]]'){
          return res.status(401).send('Ambas as senhas devem ser iguais.')
        } else if (err.message == 'child "email" fails because ["email" must be a valid email]'){
          return res.status(401).send('Email inválido.')
        } // else {
        //   return res.status(204).send('Usuário ou Senha inválidos.')
        // }
      } else {
        res.send("Login realizado com sucesso.");
      }
    });
  }
};
