const mongoose = require("mongoose"); // Importando o mongoose
const Schema = mongoose.Schema; // Definindo uma variável para o Schema

const ParticipationSchema = new Schema({ // Criação de um novo Schema
  // ATributos:
  user: {
    type: Schema.Types.ObjectId, // O tipo é um Objeto
    ref: "User", // Referência do Objeto
    required: true // Obrigatório
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.models("Participation", ParticipationSchema); // Exportando o Schema