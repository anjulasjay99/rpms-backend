const router = require("express").Router();
let Role = require("../models/Roles");

//fecth all available user roles
router.route("/").get((req, res) => {
  Role.find()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("error");
    });
});

module.exports = router;
