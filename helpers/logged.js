module.exports = {
  isLogged: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error_msg", "Erro ao autenticar o usuário.");
    res.redirect("/");
  },
};
