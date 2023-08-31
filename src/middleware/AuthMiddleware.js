const jwt = require("jsonwebtoken");
const db = require("../models/index");

const isAuthenticated = (req, res, next) => {
  //#swagger.autoHeaders=false
  try {
    const authorizationHeader = req.headers["authorization"];
    console.log("____Token lay tu client " + authorizationHeader);
    const accessToken = authorizationHeader.split(" ")[1];
    const decodeJwt = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    //set uid to req object 
    req.uid = decodeJwt.uid;
    next();
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError){
      return res.status(401).send("Token Expired")
    }
    console.log("____authentication not valid");
    return res.status(401).send("Authentication not valid")
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const uid = req.uid
    const admin = await db.Admin.findByPk(uid);
    if (admin !== null) {
      next();
    }else{
      return res.status(401).send("Authorize is not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const isAgency = async (req, res, next) => {
  try {
    const uid = req.uid
    const agency = await db.Admin.findByPk(uid);
    if (agency !== null) {
      next();
    }else{
      return res.status(401).send("Authorize is not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const isCreator = async (req, res, next) => {
  try {
    const uid = req.uid
    const creator = await db.Creator.findByPk(uid);
    if (creator) {
      next();
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const isCustomer = async (req, res, next) => {
  try {
    const uid = req.uid
    const customer = await db.Costomer.findByPk(uid);
    if (customer) {
      next();
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
