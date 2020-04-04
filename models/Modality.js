const mongoose = require("mongoose"); // Importando o mogoose
const Schema = mongoose.Schema; // Definindo uma variável para o Schema

const ModalitySchema = new Schema({ // Criando um novo Schema
  // Atributos:
  name: {
    type: String, // Tipo do atributo
    required: true // Obrigatório
  }
});

module.exports = mongoose.models("Modality", ModalitySchema); // Exportando o Schema