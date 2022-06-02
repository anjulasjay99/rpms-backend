const ReviewerRouter = require("express").Router();

const Review = require("../models/Reviwer");

//add new reviewer
ReviewerRouter.route("/save").post(async(req, res) => {
  const { GroupId,Description} = req.body;

  const newReview = new Review({
    GroupId,
    Description
  });

  newReview
    .save()
    .then(() => {
      res.json("New Reviewer added");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = ReviewerRouter;