const mongoose = require("mongoose");
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
        return res.send("Token inválido.");
      }

      if (Date.now() > user.passwordResetExpires) {
        return res.send("Token foi expirado, gere um novo.");
      }

      if (password.length < 8) {
        return res.send("Senha muito curta (Mínimo 8 dígitoss)");
      }

      user.password = password;

      await user.save();

      return res.send("Deu certo");
    } catch (error) {
      console.log(error);
      res.send("Erro ao resetar a senha, tente novamente");
    }
  },
};
