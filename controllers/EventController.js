const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("User");
const joi = require('joi');
require("../models/Event");
const Event = mongoose.model("Event");
require("../models/Modality");
const Modality = mongoose.model("Modality");

module.exports = {
  async create(req, res) {
    const schema = joi.object().keys({
      user: joi.string().min(24).max(24).required(),
      title: joi.string().max(30).required(),
      address: joi.string().required(),
      date: joi.string().required(),
      hour: joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      private: joi.boolean().required(),
      modality: joi.string().min(3).required(),
      // members,
    });
    // const { thumbnails } = req.file;

    await joi.validate(req.body, schema, (err, result) => {
      if (err) {
        console.log(req.body);
        console.log(err.message);
      } else {
        const { user, title, address, date, hour, private, modality } = req.body;

        User.findById({ _id: user })
          .then((user) => {
            return console.log(
              `User: ${user}, Title: ${title}, Address: ${address}, Date: ${date}, Hour: ${hour}, Private: ${private}, Modality: ${modality}`
            );
          })
          .catch((error) => {
            return console.log(error);
          });
      }
    });
  }
}
