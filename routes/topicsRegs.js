const router = require("express").Router();

let TopicReg = require("../models/ResearchTopicReg");


//Registration of new topic with Supervisor

router.route("/add/:id").post((req,res) =>{
    
    var groupId = req.params.id;
    var isApproved = "Pending";
    const {field , topic  , supervisorId} = req.body;

    const newTopicReg = new TopicReg({
        groupId , 
        field ,
        topic ,
        supervisorId,
        isApproved
    })

    newTopicReg.save().then(()=>{
        res.json("Topic submitted for revision!");
    }).catch((err) =>{
        console.log(err);
    })
})

//get topic submission details of specif supervisor
router.route("/get/:supervisorId").get(async(req,res)=>{
        let supervisorId = req.params.supervisorId;
        await TopicReg.find({supervisorId}).then((submissions)=>{
            res.json(submissions);
        })
        .catch((err)=>{
            console.log(err)
        })
})


//update the topicsubmission
router.route("/update/:id").put(function (req, res) {
    TopicReg.findById(req.params.id, function (err, TopicReg) {
      if (!TopicReg) res.status(404).send("id not found");
      else 
      TopicReg.groupId = req.body.groupId;
      TopicReg.field = req.body.field;
      TopicReg.topic = req.body.topic;
      TopicReg.supervisorId = req.body.supervisorId;
      TopicReg.isApproved = req.body.isApproved;
      TopicReg
        .save()
        .then((TopicReg) => {
            console.log(TopicReg)
          res.json("Suceessfully updated!");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    });
  });


//Get all topic submissions 

router.route("/").get((req,res) =>{
    TopicReg.find().then((submissions) =>{
        res.json(submissions);
    }).catch((err) =>{
        console.log(err);
    })
})


// Get all topics by group ID 

router.route("/getByGroup/:id").get((req,res) =>{
    const grpID = req.params.id;
    TopicReg.find({groupId : grpID }).then((topics) =>{
        res.json(topics);
    }).catch((err) =>{
        console.log(err);
    })
})


// Request CoSupervisor 

router.route("coSupervisor/:id").put((req,res) =>{
    const grpID = req.params.id;
    const {coSupervisorID} = req.body;

    TopicReg.updateOne(
        {groupId : grpID},
        {
            $set : {
                cosupervisorId : coSupervisorID
            }
        }
    )
    

})

module.exports = router;