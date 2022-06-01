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

    const { name, description, document, fileId, visibility } = req.body;

    const dateCreated = new Date().toUTCString();

    const newTemplate = new Template({
      name,
      description,
      document,
      fileId,
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
      const fileId = Date.now().toString();
      const docName = fileId + "-" + document.name;
      const docPath = templateDir + docName;
      document.mv(docPath);
      res.status(200).json({ document: document.name, fileId: fileId });
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

//Fetch Template by Name

router.route("/getbyName/:name").get((req, res) => {
  const p_name = req.params.name;
  Template.find({ name: p_name })
    .then((templates) => {
      console.log(templates);
      res.json(templates).status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Fetch Template by Id
router.route("/:id").get((req, res) => {
  const id = req.params.id;
  Template.findById(id)
    .then((template) => {
      res.json(template).status(200);
    })
    .catch((err) => {
      res.status(400).json("Error");
      console.log(err);
    });
});

//delete template
router.route("/:id").delete((req, res) => {
  const token = req.header("x-access-token");
  if (auth(token)) {
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
      const doc = templateDir + file;
      fs.unlink(doc, (err) => {
        console.log(err);
      });
    }

    Template.findOneAndDelete({ fileId: id })
      .then(() => {
        res.status(200).json("Deleted!");
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  } else {
    res.status(400).json("Authentication Failed!");
  }
});

module.exports = router;
