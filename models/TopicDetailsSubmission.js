const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TopicDetailsSchema = new Schema({
    groupId : {type : String , required: true},
    document : {type : String , required : true},
    isAccepted : {type : Boolean , required : true}
});

const TopicDetails = mongoose.model("topic_details" , TopicDetailsSchema);

module.exports = TopicDetails;