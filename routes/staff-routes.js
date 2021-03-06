const staffRouter = require("express").Router();

const model = require("../models/staff");

//register staff
staffRouter.route("/save").post((req, res) => {
  let staff = new model(req.body);
  staff
    .save()
    .then((staff) => {
      res.status(200).json({ staff: "A new Staff added" });
    })
    .catch((err) => {
      res.status(400).send("Staff member not added");
      console.log(err);
    });
});

//fecth all registered staff members
staffRouter.route("/getAll").get((req, res) => {
  model
    .find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

//update details of a staff member
staffRouter.route("/update/:id").put((req, res) => {
  const id = req.params.id;
  let data = new model(req.body);
  model
    .findOneAndUpdate(id, {
      firstName: data.firstName,
      lastName: data.lastName,
      sliitEmail: data.sliitEmail,
      staffId: data.staffId,
      telNo: data.telNo,
      field: data.field,
      password: data.password,
    })
    .then(() => {
      res.status(200).json("Updated Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error!");
    });
});

//remove a staff member from the db
staffRouter.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;

  model
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).json("Deleted Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error!");
    });
});

//fetch supervisors

staffRouter.route("/getSupervisors").get((req, res) => {
  const p_role = "supervisor";
  model
    .find({ role: p_role })
    .then((supervisors) => {
      res.json(supervisors);
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

//get total number of staff members
staffRouter.route("/totalusers").get((req, res) => {
  model
    .countDocuments()
    .then((count) => {
      res.status(200).json({ total: count });
    })
    .catch((err) => {
      res.status(400).json("Error");
      console.log(err);
    });
});

// fetch co-supervisors

staffRouter.route("/getcoSupervisors").get((req,res) =>{
  const p_role = "co-supervisor"
  model
    .find({role : p_role })
    .then((cos) =>{
      res.json(cos);
      res.status(200);
    }).catch((err) =>{
      console.log(err);
      res.status(400);
    })
})

// Staff Login - Check Username

staffRouter.route("/checkUsername/:username").get(async(req,res) =>{
  const username = req.params.username;
  console.log(username)
  await model.exists({ sliitEmail : username}).then((data) =>{
    if(data != null){
      res.json(true);
  }
  else{
    res.json(false);
  }
  console.log(data);
  }).catch((err) =>{
    console.log(err);
  });
});

// Staff Login - Return Password

staffRouter.route("/getPass/:username").get(async(req,res) => {
  const username = req.params.username;
  console.log(username)
  await model.find({sliitEmail : username}).then((data) =>{
    res.json(data);
  }).catch((err) =>{
    console.log(err);
  })
})



module.exports = staffRouter;
