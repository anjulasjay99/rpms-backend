const router = require("express").Router();
let Admin = require("../models/Admin");
let jwt = require("jsonwebtoken");

const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

//Fetch all available admins
router.route("/").get((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    Admin.find()
      .then((admins) => {
        res.status(200).json(admins);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("error");
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//Update admin details
router.route("/").put(async (req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const { name, email, password, telNo, nic, role } = req.body;
    const admin = {
      firstName,
      lastName,
      email,
      password,
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
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//Remove admin
router.route("/:email").delete(async (req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
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
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//admin login
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  await Admin.findOne({ email })
    .then((data) => {
      //check if user exists
      if (data) {
        //check passowrd
        if (password === data.password) {
          //create json web token
          const token = jwt.sign(
            {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              telNo: data.telNo,
              role: data.role,
            },
            "adminToken"
          );
          //send response
          res.status(200).json({ auth: true, message: "success", user: token });
        } else {
          //send response
          res.status(400).json({ auth: false, message: "incorrect password" });
        }
      } else {
        //send response
        res.status(400).json({ auth: false, message: "user does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ auth: false, message: err });
    });
});

module.exports = router;
