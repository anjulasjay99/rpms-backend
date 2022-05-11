const router = require("express").Router();
let Admin = require("../models/Admin");

//Fetch all available admins
router.route("/").get((req, res) => {
  Admin.find()
    .then((admins) => {
      res.status(200).json(admins);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("error");
    });
});

//Update admin details
router.route("/").put(async (req, res) => {
  const { name, email, telNo, nic, role } = req.body;
  const admin = {
    name,
    email,
    telNo,
    nic,
    role,
  };

  await Admin.findOneAndUpdate({ email }, admin)
    .then(() => {
      console.log("Admin details updated");
      res.status(200).json(true);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(false);
    });
});

//Remove admin
router.route("/:email").delete(async (req, res) => {
  const email = req.params.email;

  await Admin.deleteOne({ email })
    .then(() => {
      console.log("Admin removed!");
      res.status(200).json("success");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(false);
    });
});

module.exports = router;
