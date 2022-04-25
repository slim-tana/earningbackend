const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');





const check = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (token) {
      decodedToken = jwt_decode(token);

      if (decodedToken) {
        res.status(200).json({
          msg: "User Checked!",
          "decoded token ": decodedToken
        }); next();
      }
      if (!decodedToken) {
        return res.status(400).json({ msg: "You are not authorized 1  (decoded)" });
      }

      return res.status(400).json({ msg: "You are not authorized (token )" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

}
const notReqAuthentication = (req, res, next) => {
  // VERIFYING USER
  // const token = req.cookies.refreshtoken;
  const token = req.cookies.access_token;

  // IF THERE IS A TOKEN NAME WITH JWT THEN IT IT WON'T LET USER GO SOME ROUTE
  if (token) {
    console.log(token);
    console.log("There is a token ");
    res.status(200).json({
      message: "you must log out *"
    });


  } else {
    // IF THERE IS NO TOKEN THEN USER ALLOW TO VISIT CERTAIN ROUTE
    console.log("There is no token ");
    next();
  }

}
const Log = (req, res, next) => {
  // VERIFYING USER
  // const token = req.cookies.refreshtoken;
  const token = req.cookies.access_token;

  // IF THERE IS A TOKEN NAME WITH JWT THEN IT IT WON'T LET USER GO SOME ROUTE
  if (token) {
    next();

  } else {
    // IF THERE IS NO TOKEN THEN USER ALLOW TO VISIT CERTAIN ROUTE
    console.log("There is no token ");
    res.status(200).json({
      message: "you must log in *"
    });
  }
}

module.exports = { check, Log,notReqAuthentication };

