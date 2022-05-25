const LoginActivity = require("../models/LoginActivity");
const router = require("express").Router();
let jwt = require("jsonwebtoken");

const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

//fetch all login activities
router.route("/").get((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    LoginActivity.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    res.status(400).json("Authentication Failed");
  }
});

module.exports = router;
