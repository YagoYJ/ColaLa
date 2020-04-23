const mongoose = require("mongoose");
const crypto = require("crypto");
const mailer = require("../modules/mailer");
require("../models/User");
const User = mongoose.model("User");

module.exports = {
  async create(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.send("User not found");
      }

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      mongoose.set("useFindAndModify", false);
      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      mailer.sendMail(
        {
          to: email,
          from: "devs@colala.com.br",
          template: "auth/forgotPassword",
          context: { token },
        },
        (error) => {
          if (error) {
            req.flash("error_msg", "Erro ao enviar o e-mail.");
            res.render("pages/forgotPassword", {
              email: email,
            });
          }
          res.redirect("/reset-password");
        }
      );
    } catch (error) {
      console.log(error);
      res.send("Erro no esqueci minha senha");
    }
  },
};
