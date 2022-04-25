const mongoose =require ("mongoose");

const PlaylistSchema = mongoose.Schema({
    idUser: { type: String},
    name:{type: String,default: 'new Playlist'},
    image:{type: String,default: 'placeholder.jpg'},
    description: {type:String},
    music: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Music"}
    ],
    dateCreation: {type:Date,default:Date.now()}
});
const Playlist = mongoose.model("Playlist", PlaylistSchema);
 module.exports = Playlist;
