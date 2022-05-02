const router = require("express").Router();

const templateDir = "./uploads/templates/";
const markingSchemesDir = "./uploads/marking_schemes/";

//upload a new template
router.route("/templates").post((req, res) => {
  if (req.files) {
    let document = req.files.template;
    const docPath = templateDir + Date.now().toString() + "-" + document.name;
    document.mv(docPath);
    res.json(docPath);
  } else {
    res.json("No file was uploaded!");
  }
});

//upload a new marking scheme
router.route("/markingschemes").post((req, res) => {
  if (req.files) {
    let document = req.files.markingscheme;
    const docPath =
      markingSchemesDir + Date.now().toString() + "-" + document.name;
    document.mv(docPath);
    res.json(docPath);
  } else {
    res.json("No file was uploaded!");
  }
});

module.exports = router;
