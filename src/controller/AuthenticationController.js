const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../model/User");
const User = mongoose.model("User");

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid password" });
    }

    user.password = undefined;

    // const token = jwt.sign({ id: user.id }, authConfig.secret, {
    //   expiresIn: 86400
    // });

    res.redirect("/home");
  }
};
