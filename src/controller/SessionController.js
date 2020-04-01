const mongoose = require("mongoose");
require("../model/User");
const User = mongoose.model("User");

module.exports = {
  create(req, res) {
    const { user, password } = req.body;

    res.send(`User: ${user}, Password: ${password}`);

    // User.findOne({ nickname: user })
    //   .then(user => {})
    //   .catch(error => {
    //     User.findOne({ email: user })
    //       .then(user => {})
    //       .catch(error => {
    //         alert("Usuário não encontrado");
    //       });
    //   });
  }
};
