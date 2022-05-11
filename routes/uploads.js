const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const templateDir = "./uploads/templates/";
const markingSchemesDir = "./uploads/marking_schemes/";

//upload a new template
router.route("/templates").post((req, res) => {
  if (req.files) {
    let document = req.files.template;
    const docName = Date.now().toString() + "-" + document.name;
    const docPath = templateDir + docName;
    document.mv(docPath);
    res.status(200).json(docName);
  } else {
    res.status(400).json("No file was uploaded!");
  }
});

//upload a new marking scheme
router.route("/markingschemes").post((req, res) => {
  if (req.files) {
    let document = req.files.markingscheme;
    const docName = Date.now().toString() + "-" + document.name;
    const docPath = markingSchemesDir + docName;
    document.mv(docPath);
    res.status(200).json(docName);
  } else {
    res.status(400).json("No file was uploaded!");
  }
});

//get uploaded template
router.route("/templates/:id").get((req, res) => {
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

//get uploaded markingschemes
router.route("/markingschemes/:id").get((req, res) => {
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
