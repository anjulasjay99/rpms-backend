const router = require("express").Router();

let Student = require("../models/Students");

//Student Registration

router.route("/add").post((req, res) => {
  const { firstName, lastName , IdNumber, email, nic, telNo} = req.body;
  const isGrouped = 0;
  const role = "Student";
  const newStudent = new Student({
    firstName,
    lastName,
    IdNumber,
    email,
    nic,
    telNo,
    isGrouped,
    role,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Fetch all student

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Fetch all ungrouped students

router.route("/ungrstudents").get((req, res) => {
  Student.find({ isGrouped: 0 })
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update student details
router.route("/").put(async (req, res) => {
  const { InitName, IdNumber, email, nic, telNo, isGrouped, role } = req.body;
  const student = {
    InitName,
    IdNumber,
    email,
    nic,
    telNo,
    isGrouped,
    role,
  };

  await Student.findOneAndUpdate({ IdNumber }, student)
    .then(() => {
      console.log("Student details Updated!");
      res.json(true);
    })
    .catch((err) => {
      console.log(err);
      res.json(false);
    });
});

//Remove student
router.route("/:id").delete(async (req, res) => {
  const IdNumber = req.params.id;

  await Student.deleteOne({ IdNumber })
    .then(() => {
      console.log("Student Removed!");
      res.json(true);
    })
    .catch((err) => {
      console.log(err);
      res.json(false);
    });
});

module.exports = router;
