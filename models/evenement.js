const mongoose = require('mongoose');



const evenementSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    nbrpalacedispo: {
      type: Number,
    },
    Phone: {
      type: Number,
    },
    Address: {
      type: String,
    },
    DateDebut: {
      type: Date,
    },
    DateFin: {
      type: Date,
    },
    picture: {
      type: String,
      default: "./users/Mega-PC/Desktop/user.jpg"
    },    
    likes: [
      {  type: mongoose.Schema.Types.ObjectId,default:0, ref: "User" }
    ],
    dislikes: [
      {  type: mongoose.Schema.Types.ObjectId,default:0, ref: "User" }],
  },
  {
    timestamps: true,
  }
);




const evenementModel = mongoose.model("evenement", evenementSchema);

module.exports = evenementModel;