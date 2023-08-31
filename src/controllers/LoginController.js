const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const db = require("../models/index");
const Firebase = require("../services/Firebase");
const Utils = require("../services/Utils");

var refreshTokens = [];
module.exports = {
  async checkUserAccount(req, res) {
    /* 
        #swagger.tags = ['Login']
         #swagger.description = "Check User Account"
        */
    // Authentication
    // console.log(req.body.idToken);
    // console.log(req.body.idToken.toString());
    const idToken = req.body.idToken.toString();
    let checkRevoked = true;
    admin
      .auth()
      .verifyIdToken(idToken, checkRevoked)
      .then((data) => {
        console.log(data);
        //account gmail có tồn tại đc xác thực từ firebase

        //sau đó kiểm tra db
        const uid = data.uid;
        let accountdb = checkUserInDB(uid);
        accountdb.then((accountdb) => {
          if (accountdb) {
            console.log("____role sau khi check db:", accountdb);
            const accessToken = jwt.sign(
              { uid: data.uid },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "3600s",
              }
            );
            const refreshToken = jwt.sign(
              { uid: data.uid },
              process.env.REFRESH_TOKEN_SECRET
            );
            refreshTokens.push(refreshToken);
            // Firebase.registerUichaTopic();
            // Firebase.fcm_uicha_Topic("Chào mừng bạn ghé chơi");
            res.json({ accessToken, refreshToken, accountdb });
          } else {
            res.status(400).json({
              status: 400,
              message: "some thing wrong!",
            });
          }
        });
      })
      .catch((e) =>
        res.status(400).json({
          //token bi loi
          status: 400,
          message: e.message,
          error: e,
        })
      );
  },

  async refreshToken(req, res) {
    /* 
        #swagger.tags = ['Login']
         #swagger.description = "Refresh Token"
        */
    try {
      const refreshToken = req.body.token;
      if (!refreshToken) res.sendStatus(401);
      if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, data) => {
          console.log(err, data);
          console.log(refreshTokens);
          if (err) res.sendStatus(403);
          const accessToken = jwt.sign(
            { uid: data.uid },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "3600s",
            }
          );
          res.json({ accessToken });
        }
      );
    } catch (error) {
      console.log("_______(refreshTokenErr)");
    }
  },
};

async function checkUserInDB(uid) {
  let role = null;
  let status = null;
  try {
    console.log("__checkUserInDB");
    let AccountRoleSaler = await db.Saler.findByPk(uid);
    if (AccountRoleSaler) {
      role = "saler";
      // console.log(role);
      return role;
    }
    let AccountRoleCustomer = await db.Customer.findByPk(uid);
    if (AccountRoleCustomer) {
      role = "customer";
      // console.log(role);
      return role;
    }
    role = "unknown";
    return role;
  } catch (error) {
    console.log("___Problem when query DB____", error);
  }
}
