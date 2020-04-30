const mongoose = require("mongoose"); // Importando o mogoose
const Schema = mongoose.Schema; // Definindo uma variável para o Schema

const ModalitySchema = new Schema({
  // Criando um novo Schema
  // Atributos:
  name: {
    type: String, // Tipo do atributo
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model("Modality", ModalitySchema); // Exportando o Schema
