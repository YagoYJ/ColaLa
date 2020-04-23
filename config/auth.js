const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../models/User");
const User = mongoose.model("User");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        User.findOne({ email: email })
          .select("+password")
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Esta conta não existe" });
            } else {
              bcrypt.compare(password, user.password, (error, check) => {
                if (check) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: "Senha incorreta" });
                }
              });
            }
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};
