const mongoose =require ("mongoose");
const { Schema } = mongoose;

const musicSchema = mongoose.Schema({
    description: {type:String},
    name:{type:String},
    dateCreation: {type:Date,default:Date.now()},
    views:{type:Number,default:0},
    likes: [
      { type: Schema.Types.ObjectId,default:0, ref: "User" }
    ],
    dislikes: [
      { type: Schema.Types.ObjectId,default:0, ref: "User" }],
    duration:{type:Number},
    genre: {type:String},
    artistName: {type:String},
    image: {type: String,default: 'placeholder.jpg'},
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        }
    ],
    lyrics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lyrics",
      }
  ],
  mp3:{
    type: mongoose.Schema.Types.ObjectId
  },
  postedby: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User" },

    //bucket : {type:GridFSBucket},
  numComments: { type: Number, required: false,default:0},

});
const musique = mongoose.model("Music", musicSchema);
module.exports = musique;
