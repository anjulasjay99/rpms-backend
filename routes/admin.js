const router = require("express").Router();
let Admin = require("../models/Admin");

//Fetch all available admins
router.route("/").get((req, res) => {
  Admin.find()
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
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
      res.json(true);
    })
    .catch((err) => {
      console.log(err);
      res.json(false);
    });
});

//Remove admin
router.route("/:email").delete(async (req, res) => {
  const email = req.params.email;

  await Admin.deleteOne({ email })
    .then(() => {
      console.log("Admin removed!");
    })
    .catch((err) => {
      console.log(err);
      res.json(false);
    });
});

module.exports = router;
