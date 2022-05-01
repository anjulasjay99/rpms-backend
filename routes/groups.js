const router = require("express").Router();

let Group = require("../models/Groups");

//Group Registration

router.route("/add").post((req,res) =>{
    //Getting Maximum ID 
    var MaxID = Group.find().sort({"groupID" : -1}).limit(1).toArray().map(function(u){return u.groupID});
    const
    {
        groupID , LeaderID , LeaderNIC , Leadermail , Leadercontact,
        S2ID , S2NIC , S2mail , S2contact ,
        S3ID , S3NIC , S3mail , S3contact ,
        S4ID , S4NIC , S4mail , S4contact ,  
   
    }    = req.body;

    groupID = "RSH_GRP"+ MaxID+1;

    //Adding Group Details to the Database

    const newGroup = new Group({
        groupID, LeaderID , LeaderNIC , Leadermail , Leadercontact,
        S2ID , S2NIC , S2mail , S2contact ,
        S3ID , S3NIC , S3mail , S3contact ,
        S4ID , S4NIC , S4mail , S4contact ,
    });

    newGroup.save().then(() =>{
        res.json("Group Added");
    }).catch((err) =>{
        console.log(err);
    });
});


module.exports = router;