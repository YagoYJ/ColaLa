const mongoose = require("mongoose"); // Importando o mongoose
const Schema = mongoose.Schema; // Definindo uma variável para o Schema

const EventSchema = new Schema({
  // Criando um novo Schema
  // Atributos:
  user: {
    type: Schema.Types.ObjectId, // Tipo do atributo
    ref: "User", // Referência do Objeto
    required: true, // Obrigatório
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  modality: {
    type: Schema.Types.ObjectId,
    ref: "Modality",
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Event", EventSchema); // Exportando o Schema
