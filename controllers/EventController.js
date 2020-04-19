const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("User");
require("../models/Event");
const Event = mongoose.model("Event");
require("../models/Modality");
const Modality = mongoose.model("Modality");

module.exports = {
  async create(req, res) {
    const {
      user,
      title,
      address,
      date,
      hour,
      private,
      modality,
      //   members,
    } = req.body;
    // const { thumbnails } = req.file;

    await User.findById({ _id: user })
      .then((user) => {
        return console.log(
          `User: ${user}, Title: ${title}, Address: ${address}, Date: ${date}, Hour: ${hour}, Private: ${private}, Modality: ${modality}`
        );
      })
      .catch((error) => {
        return console.log(error);
      });
  },
};
