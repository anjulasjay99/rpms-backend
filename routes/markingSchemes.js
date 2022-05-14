const router = require("express").Router();
let MarkingScheme = require("../models/MarkingSchemes");
const fs = require("fs");
const path = require("path");
let jwt = require("jsonwebtoken");

const markingSchemesDir = "./uploads/marking_schemes/";

const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

//fetch all available marking schemes
router.route("/").get((req, res) => {
  MarkingScheme.find()
    .then((markingSchemes) => {
      res.status(200).json(markingSchemes);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("error");
    });
});

//add a new marking scheme
router.route("/:username").post((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const username = req.params.username;

    const { name, description, document, criterias, visibility } = req.body;

    const dateCreated = new Date();

    const newMarkingScheme = new MarkingScheme({
      name,
      description,
      document,
      criterias,
      visibility,
      createdBy: username,
      dateCreated,
    });

    newMarkingScheme
      .save()
      .then(() => {
        res.status(200).json("Marking Scheme Added");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//upload a new marking scheme
router.route("/files/upload").post((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    if (req.files) {
      let document = req.files.markingscheme;
      const docName = Date.now().toString() + "-" + document.name;
      const docPath = markingSchemesDir + docName;
      document.mv(docPath);
      res.status(200).json(docName);
    } else {
      res.status(400).json("No file was uploaded!");
    }
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//download uploaded markingschemes
router.route("/files/download/:id").get((req, res) => {
  const id = req.params.id;
  let markingschemes = fs.readdirSync(markingSchemesDir);
  let file = "";

  for (let i = 0; i < markingschemes.length; i++) {
    if (markingschemes[i].split("-")[0] === id) {
      file = markingschemes[i];
      break;
    }
  }

  if (file !== "") {
    res.sendFile(path.join(__dirname, "../uploads/marking_schemes/", file));
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
