const Karaoke = require("../../models/Karaoke");
const { check, Log ,notReqAuthentication} = require('../../middleware/auth');
const User = require("../../models/userModel");
const router = require("express").Router();
const multer = require('multer');
const express = require("express");
const jwt_decode = require('jwt-decode');
const mongoose = require("mongoose");

//CREATE
//http://localhost:5000/api/karaoke/
router.post("/", async (req, res) => {
    const newKaraoke = new Karaoke(req.body);

    try {
        const savedKaraoke = await newKaraoke.save();
        res.status(200).json(savedKaraoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
//http://localhost:5000/api/Karaoke/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedKaraoke = await Karaoke.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedKaraoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
//http://localhost:5000/api/Karaoke/:id
router.delete("/:id", async (req, res) => {
    try {
        await Karaoke.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
//http://localhost:5000/api/products/find/:id
router.get("/find/:id", async (req, res) => {
    try {
        const karaoke = await Karaoke.findById(req.params.id);
        res.status(200).json(karaoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
//http://localhost:5000/api/Karaoke/
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let karaokes;

        if (qNew) {
            karaokes = await Karaoke.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            karaokes = await Karaoke.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            karaokes = await Karaoke.find();
        }

        res.status(200).json(karaokes);
    } catch (err) {
        res.status(500).json(err);
    }
});



router.post('/upload/:iduser/:score',async (req, res) => {
    /*const token = req.cookies.access_token;
    decodedToken = jwt_decode(token);*/
    router.use(express.static('public'));
    const user = await User.findById(req.params.iduser);

    console.log(user);

    console.log(req.params.score);

    const newKaraoke = new Karaoke();
    //console.log(mongoose.Types.ObjectId(decodedToken.sub))
    newKaraoke.idUser = req.params.iduser
    newKaraoke.score = req.params.score;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public')
        },
        filename: (req, file, cb) => {
            const Dd = Date.now();
            newKaraoke.videoLink = 'kke';
            newKaraoke.save();
            cb(null, Dd + file.originalname)

        }
    });
user.karaoke.push(newKaraoke);
user.save();
    const upload = multer({storage}).array('file');

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
});

module.exports = router;
