const mongoose = require("mongoose");
const music = require("../../models/music");
const lyrics = require("../../models/lyrics");
const User = require("../../models/userModel");

//const { check} = require('../../middleware/auth');
const jwt_decode = require('jwt-decode');


const lyricsCtrl = {

    addlyrics: async (req, res) => {


        try {


            const token = req.cookies.access_token;
            decodedToken = jwt_decode(token);


            const MusicId = req.params.id;
            const muzika = await music.findOne({ _id: MusicId });
            if (!muzika) {
                return res.status(400).json({ msg: "please check id" });
            }

            const newlyrics = new lyrics({
                lyrics: req.body.lyrics,
                postedby: mongoose.Types.ObjectId(decodedToken.sub),
                music: muzika
            });

            await newlyrics.save();

            music.findByIdAndUpdate(MusicId, { $push: { lyrics: newlyrics } }, { new: true },
                (err, result) => {
                    if (err) {

                        return res.status(422).json({ error: err })
                    }
                })
            music.findByIdAndUpdate(MusicId, { $inc: { numlyrics: 1 } }, { new: true },
                (err, result) => {
                    if (err) {

                        return res.status(422).json({ error: err })
                    }
                })
            res.json({
                msg: "lyrics has been created!",
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }


    },
    deletelyrics: async (req, res) => {
        try {
            let x = mongoose.Types.ObjectId(req.params.idlyrics);
            const com = await lyrics.findById(req.params.idlyrics)
            if (!com) {
                res.status(400).json({ msg: "lyrics does not exist." });
            }

            else {
                com.delete();
                music.findByIdAndUpdate(req.params.idMusic, { $pull: { lyrics: x } }, { new: true },
                    (err, result) => {
                        if (err) {

                            return res.status(422).json({ error: err })
                        }
                    });
                res.status(200).json("lyrics has been deleted");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    likelyrics: async (req, res) => {
        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);
        let x = mongoose.Types.ObjectId(decodedToken.sub);
        const user = await User.findById(decodedToken.sub)
        if (!user) {
            res.status(400).json({ msg: "User does not exist." });
        }
        lyrics.findByIdAndUpdate(req.params.lyricsId, { $push: { likes: x } }, { new: true },
            (err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
            })
        return res.status(200).json({ msg: "success!" });
    },
    dislikelyrics: async (req, res) => {
        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);
        let x = mongoose.Types.ObjectId(decodedToken.sub);
        const user = await User.findById(decodedToken.sub)
        if (!user) {
            res.status(400).json({ msg: "User does not exist." });
        }
        lyrics.findByIdAndUpdate(req.params.lyricsId, { $push: { dislikes: x } }, { new: true },
            (err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
            })
        return res.status(200).json({ msg: "success!" });
    },
    updateLyrics:async (req, res) => {}



}; module.exports = lyricsCtrl;
