const router = require("express").Router();

let Student = require("../models/Students");

//Student Registration 

router.route("/add").post((req,res) =>{
    const { InitName , IdNumber , email , nic , telNo , isGrouped } = req.body;
    isGrouped = 0;
    const newStudent = new Student({
        InitName,
        IdNumber,
        email,
        nic,
        telNo,
        isGrouped
    });

    newStudent.save().then(()=>{
        res.json("Student Added");
    }).catch((err) =>{
        console.log(err);
    });
});


//Fetch all student

router.route("/").get((req,res) =>{
    Student.find().then((students) =>{
        res.json(students);
    }).catch((err) =>{
        console.log(err);
    })
})


// Fetch all ungrouped students 

router.route("/ugrstudents").get((req,res) =>{
    Student.find({isGrouped : 0}).then((students) =>{
        res.json(students);
    }).catch((err) =>{
        console.log(err);
    });
});

module.exports = router;


