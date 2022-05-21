const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const researchTopicReg = new Schema({

    groupId : {type : String , required : true},
    field : {type : String , required : true},
    topic : {type : String , required : true},
    description : {type : String , required : true},
    supervisorId : {type : String , required : true},
    isApproved : {type : Boolean , required : true}
});

const TopicReg = mongoose.model("topicreg" , researchTopicReg);

module.exports = TopicReg;