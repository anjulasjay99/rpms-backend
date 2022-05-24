const router = require("express").Router();
let Admin = require("../models/Admin");
let LoginActivity = require("../models/LoginActivity");
let jwt = require("jsonwebtoken");

const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

const createLoginActivity = (user) => {
  const activity = new LoginActivity({
    name: user.firstName + " " + user.lastName,
    email: user.email,
    dateAndTime: new Date(),
  });
  activity
    .save()
    .then((data) => {
      console.log("logged", data);
    })
    .catch((err) => {
      console.log(err);
    });
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
router.route("/:id").put(async (req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const id = req.params.id;
    const admin = new Admin(req.body);

    await Admin.findByIdAndUpdate(id, {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
      telNo: admin.telNo,
      role: admin.role,
    })
      .then((d) => {
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
router.route("/:id").delete(async (req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const id = req.params.id;

    await Admin.findByIdAndDelete(id)
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
          createLoginActivity(data);
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
