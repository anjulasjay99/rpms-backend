const router = require("express").Router();
let Template = require("../models/Templates");
const fs = require("fs");
const path = require("path");
let jwt = require("jsonwebtoken");

const templateDir = "./uploads/templates/";

const auth = (token) => {
  try {
    jwt.verify(token, "adminToken");
    return true;
  } catch (err) {
    return false;
  }
};

//fetch all available templates
router.route("/").get((req, res) => {
  Template.find()
    .then((templates) => {
      res.status(200).json(templates);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("error");
    });
});

//add a new template
router.route("/:username").post((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    const username = req.params.username;

    const { name, description, document, visibility } = req.body;

    const dateCreated = new Date();

    const newTemplate = new Template({
      name,
      description,
      document,
      visibility,
      createdBy: username,
      dateCreated,
    });

    newTemplate
      .save()
      .then(() => {
        res.status(200).json("Template Added");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//upload a new template
router.route("/files/upload").post((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
    if (req.files) {
      let document = req.files.template;
      const docName = Date.now().toString() + "-" + document.name;
      const docPath = templateDir + docName;
      document.mv(docPath);
      res.status(200).json(docName);
    } else {
      res.status(400).json("No file was uploaded!");
    }
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

//download uploaded template
router.route("/files/download/:id").get((req, res) => {
  const id = req.params.id;
  let templates = fs.readdirSync(templateDir);
  let file = "";

  for (let i = 0; i < templates.length; i++) {
    if (templates[i].split("-")[0] === id) {
      file = templates[i];
      break;
    }
  }

  if (file !== "") {
    res.download(path.join(__dirname, "../uploads/templates/", file));
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
