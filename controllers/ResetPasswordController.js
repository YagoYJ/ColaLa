const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../models/User");
const User = mongoose.model("User");

module.exports = {
  async create(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ email }).select(
        "+passwordResetToken passwordReseExpires"
      );

      if (!user) {
        return res.send("Usuário não existe.");
      }

      if (token !== user.passwordResetToken) {
        console.log("Token: " + token);
        return res.send("Token inválido.");
      }

      if (Date.now() > user.passwordResetExpires) {
        return res.send("Token foi expirado, gere um novo.");
      }

      if (password.length < 8) {
        return res.send("Senha muito curta (Mínimo 8 dígitos)");
      }

      user.password = password;

      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) {
            req.flash("error_msg", "Erro ao encriptar sua senha");
            res.redirect("/forgot-password");
            return;
          } else {
            user.password = hash;

            user
              .save()
              .then(() => {
                req.flash("success_msg", "Senha alterada com sucesso!");
                res.redirect("/");
              })
              .catch((error) => {
                req.flash("error_msg", "Erro ao alterar a senha.");
                res.redirect("/forgot-password");
              });
          }
        });
      });
    } catch (error) {
      req.flash("error_msg", "Erro ao alterar a senha");
      res.redirect("/forgot-password");
    }
  },
};
