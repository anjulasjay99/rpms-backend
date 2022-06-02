const router = require("express").Router();

let Group = require("../models/Groups");
let Student = require("../models/Students");

//Group Registration

router.route("/add").post((req, res) => {

  var MaxID;
  var s;
  var id;
  var groupID;
  var newId;
  const {
    LeaderID,
    LeaderNIC,
    Leadermail,
    Leadercontact,
    S2ID,
    S2NIC,
    S2mail,
    S2contact,
    S3ID,
    S3NIC,
    S3mail,
    S3contact,
    S4ID,
    S4NIC,
    S4mail,
    S4contact,
  } = req.body;

  var findMax = () =>{
    return new Promise(function(fulfill , reject){

      Group.find().sort({_id:-1}).limit(1).then((a) =>{
        console.log(a[0].groupID);
        MaxID = a[0].groupID;
        s = MaxID.split('-');
        id = parseInt(s[1]);
        newId = id + 1;
        groupID = "RSH_GRP-" + newId;
        console.log(groupID);
        fulfill();
      }).catch((err) =>{
        console.log(err);
        reject();
      })
      
    })

  }

  //Adding Group Details to the Database
  function dbCall(){
    const newGroup = new Group({
      groupID,
      LeaderID,
      LeaderNIC,
      Leadermail,
      Leadercontact,
      S2ID,
      S2NIC,
      S2mail,
      S2contact,
      S3ID,
      S3NIC,
      S3mail,
      S3contact,
      S4ID,
      S4NIC,
      S4mail,
      S4contact,
    });
  
   
   newGroup
      .save()
      .then(() => {
        res.json("Group Added");
      })
      .catch((err) => {
        console.log(err);
      });
  
      // Updating Group ID of leader after registration
      Student.updateOne(
        {
          "email" : Leadermail
        },
        {
          $set : {
            isGrouped : true,
            GroupId : groupID
          }
        }
  
      );
      console.log(Leadermail);
      console.log(groupID);
  }

 findMax().then(function(){
   dbCall();
 });
  


});



//get all registered groups
router.route("/").get((req, res) => {
  Group.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error!");
    });
});

//assign panel to research group
router.route("/panels/:id").put((req, res) => {
  const id = req.params.id;
  const { panel } = req.body;

  Group.findByIdAndUpdate(id, { Panel: panel })
    .then(() => {
      res.status(200).json("Assigned Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error");
    });
});

module.exports = router;
