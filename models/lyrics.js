const mongoose = require("mongoose");
const lyricsSchema = new mongoose.Schema(
  {
    lyrics: { type: String, required: true },
    music: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Music",
      required: true,
    },
    postedby: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User" },
    likes: [
      {  type: mongoose.Schema.Types.ObjectId,default:0, ref: "User" }
    ],
    dislikes: [
      {  type: mongoose.Schema.Types.ObjectId,default:0, ref: "User" }],
  },

  { timestamps: true }
);
module.exports = mongoose.model("Lyrics", lyricsSchema);

