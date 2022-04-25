
const evenementModel = require("../../models/evenement");
const User = require("../../models/userModel");

const { search } = require('../../routes/event/evenement');
const ObjectId = require("mongoose").Types.ObjectId;
// const jwt_decode = require('jwt-decode');


module.exports.signUp = async (req, res) => { 
   
  const {nom, description, type, nbrpalacedispo, Phone, Address, DateDebut, DateFin} = req.body
// const token = req.cookies.access_token;
//         decodedToken = jwt_decode(token);
//         console.log(decodedToken.sub) 
  // decodedToken.sub : id user connecte
  try {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const evenement = await evenementModel.create({nom, description, type, nbrpalacedispo, Phone, Address, DateDebut, DateFin });
    res.status(201).json({ evenement: evenement._id});
  }
  catch(err) {
    
    res.status(200).send({ err })
  }
}

module.exports.getAllevenements = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const evenements = await evenementModel.find().select();
    res.status(200).json(evenements);
};

module.exports.evenementInfo = (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    evenementModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
    }).select();
};

module.exports.updateevenement = async (req, res) => {
  
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID invalid : " + req.params.id);
  
    try {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000")
      await evenementModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            nom: req.body.nom,
            description: req.body.description,
            type: req.body.type,
            nbrpalacedispo: req.body.nbrpalacedispo,
            Phone: req.body.Phone,
            Address: req.body.Address,
            DateDebut: req.body.DateDebut,
            DateFin: req.body.DateFin
          }          
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

  module.exports.deleteevenement = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await evenementModel.remove({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
  
  module.exports.likeevenementModel= async (req, res) => {
    const token = req.cookies.access_token;
    decodedToken = jwt_decode(token);
    console.log(decodedToken)
    let x = mongoose.Types.ObjectId(decodedToken.sub);
    console.log(x)
    console.log(decodedToken.sub)
    const user = await User.findById(decodedToken.sub)
    if (!user) {
        res.status(400).json({ msg: "User does not exist." });
    }
    evenementModel.findByIdAndUpdate(req.params.evenementModelId, { $push: { likes: x } }, { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
        })
    return res.status(200).json({ msg: "success!" });
};
module.exports.dislikeevenementModel= async (req, res) => {
    const token = req.cookies.access_token;
    decodedToken = jwt_decode(token);
    let x = mongoose.Types.ObjectId(decodedToken.sub);
    const user = await User.findById(decodedToken.sub)
    if (!user) {
        res.status(400).json({ msg: "User does not exist." });
    }
    evenementModel.findByIdAndUpdate(req.params.evenementModelId, {$push:{dislikes: x } },{ new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
        })
    return res.status(200).json({ msg: "success!" });
};
