const mongoose = require("mongoose");

module.exports = {
  async connection() {
    await mongoose
      .connect(
        "mongodb+srv://admin:colalaably1234@colala-bhonx.mongodb.net/colala?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then(() => {
        return console.log("Conected with ColaLa database");
      })
      .catch(error => {
        return console.log("Error to conect with ColaLa database -> " + error);
      });
  }
};
