const router = require("express").Router();
let Template = require("../models/Templates");

const templateDir = "./uploads/templates/";

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
});

module.exports = router;
