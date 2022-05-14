const router = require("express").Router();
let Role = require("../models/Roles");
let jwt = require("jsonwebtoken");

const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

//fecth all available user roles
router.route("/").get((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    Role.find()
      .then((roles) => {
        res.status(200).json(roles);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("error");
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

module.exports = router;
