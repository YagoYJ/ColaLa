const mongoose = require("mongoose"); // Importando o mongoose
const Schema = mongoose.Schema; // Definindo uma variável para o Schema

const ThumbnailSchema = new Schema({ // Criação de um novo Schema
  // Atributos:
  link_address: {
    type: String, // Tipo do atributo
    required: true // Obrigatório
  },
  event: { 
    type: Schema.Types.ObjectId, // O tipo é um Objeto
    ref: "Event", // Referêcia do Objeto
    required: true // Obrigatório
  }
});

module.exports = mongoose.models("Thumbnail", ThumbnailSchema); // Exportando o Schema