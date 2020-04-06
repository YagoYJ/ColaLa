const mongoose = require("mongoose"); // Importando o mongoose
const Schema = mongoose.Schema; // Definindo uma variável para o Schema

const UserSchema = new Schema({
  // Criação de um novo Schema
  // Atributos:
  nickname: {
    type: String, // Tipo do atributo
    required: true, // Obrigatório
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
  },
  events: [
    {
      type: Schema.Types.ObjectId, // Array de objetos
      ref: "Event", // Referência do Objeto
    },
  ],
  participations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Participation",
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema); // Exportando o Schema
