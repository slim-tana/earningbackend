
const chatBox = require("../../models/chatBox");

const jwt_decode = require('jwt-decode');

const musicCtrl = {

    //webscrapping
    //fetechMusic: async (req, res) => {},

    SendMessage: async (req, res) => { 
        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);
        const newchatBox = new chatBox({
                    idUserSource: decodedToken.sub,
                    idUserDestination: req.params.idUserDestination,
                    content:req.body.content
                });
                await newchatBox.save();

                res.json({
                    msg: "Message Sended Successfully!",
                    
                    chat: {
                      ...newchatBox._doc,
                    }
                  });
            
          
    },
    GetAllMessages: async (req, res) => { 
        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);

    chatBox.find({idUserSource:decodedToken.sub},function(err,data){
        res.json(data)
    });

    },
    fetchConversation: async (req, res) => {

    },
    makeSourdine: async (req, res) => {
        const token = req.cookies.access_token;
        decodedToken = jwt_decode(token);
            Msg = await chatBox.findOne({ idUserSource:decodedToken.sub,idUserDestination:req.params.id });
            await Msg.updateOne({
                "sourdine": true
            }, { new: true }
            );
            res.status(200).json({ msg: "You message has been archived" });
    
        
    }


}; module.exports = musicCtrl;
