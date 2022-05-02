const router = require("express").Router();
let Role = require("../models/Roles");

//fecth all available user roles
router.route("/").get((req, res) => {
  Role.find()
    .then((roles) => {
      res.json(roles);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
