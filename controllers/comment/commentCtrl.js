const mongoose = require("mongoose");
const music = require("../../models/music");
const Comment = require("../../models/comment");
const User = require("../../models/userModel");

//const { check} = require('../../middleware/auth');
const jwt_decode = require('jwt-decode');


const commentCtrl = {

    addcomment: async (req, res) => {
      
    
   
    try {

        const { commentaire } = req.body;

        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);

        
         const MusicId = req.params.id;
         const muzika = await music.findOne({ _id:MusicId});

        const newComment = new Comment({
            commentaire,
            postedby:mongoose.Types.ObjectId(decodedToken.sub),
            music:muzika
        });
  
        await newComment.save();
        
        music.findByIdAndUpdate(MusicId,{ $push: { comments: newComment }}, { new: true },
            (err, result) => {
                if (err) {
                    
                    return res.status(422).json({ error: err })
                }
            })
            music.findByIdAndUpdate(MusicId,{ $inc: { numComments:1 }}, { new: true },
                (err, result) => {
                    if (err) {
                        
                        return res.status(422).json({ error: err })
                    }
                })
        res.json({
            msg: "Comment Successfully!",     
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    

    },
    deletecomment: async (req, res) => {
        try {
            let x = mongoose.Types.ObjectId(req.params.idComment);
            const com = await Comment.findById(req.params.idComment)
            if (!com) {
                res.status(400).json({ msg: "Comment does not exist." });
            }

            else {
                com.delete();
                music.findByIdAndUpdate(req.params.idMusic, { $pull: { comments: x } }, { new: true },
                        (err, result) => {
                            if (err) {
                
                                return res.status(422).json({ error: err })
                            }
                        });
                res.status(200).json("comment has been deleted");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    likecomment: async (req, res) => {
        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);
        let x = mongoose.Types.ObjectId(decodedToken.sub);
        const user = await User.findById(decodedToken.sub)
        if (!user) {
            res.status(400).json({ msg: "User does not exist." });
        }
        Comment.findByIdAndUpdate(req.params.commentId, { $push: { likes: x } }, { new: true },
            (err) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
            })
            Comment.findByIdAndUpdate(req.params.commentId, { $pull: { dislikes: x } }, { new: true },
                (err) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                })
        return res.status(200).json({ msg: "success!" });
    },
    dislikecomment: async (req, res) => {
        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);
        let x = mongoose.Types.ObjectId(decodedToken.sub);
        const user = await User.findById(decodedToken.sub)
        if (!user) {
            res.status(400).json({ msg: "User does not exist." });
        }
        Comment.findByIdAndUpdate(req.params.commentId, {$push:{dislikes: x } },{ new: true },
            (err, ) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
            })
            Comment.findByIdAndUpdate(req.params.commentId, {$pull:{likes: x } },{ new: true },
                (err, ) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                })
        return res.status(200).json({ msg: "success!" });
    },
    updatecomment:async (req, res) => {}


}; module.exports = commentCtrl;
