const passport = require("passport");

module.exports = {
  create(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  },
};
