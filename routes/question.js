const router = require("express").Router();

const Subject = require("../models/Subject");
const Topic = require("../models/Topic");
const Question = require("../models/Question");
const User = require("../models/User");

const { questionValidation } = require("../validation");
const verifyToken = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
    const { error, value } = questionValidation(req.body);
    if (error) return res.status(400).send(error);
  
    const subject = await Subject.findById(req.body.subject);
    if (!subject) return res.status(404).send("Status Not Found");

    const topic = await Topic.findById(req.body.topic);
    if (!topic) return res.status(404).send("Topic Not Found");

    let user = await User.findById(req.body.user);
    if (!user) return res.status(404).send("User Not Found");

    let question = new Question({
        title: req.body.title,
        text: req.body.text,
        user,
        topic,
        subject
    })
    
    try {
      question = await question.save();

      user = await User.findOneAndUpdate(
          { _id: req.body.user },
          {
              $set: {
                  questions: [...user._doc.questions, question]
              }
          }
      ).populate('questions');

      return res.send({
        ...question._doc,
        user
      });
    } catch (err) {
      res.status(400).send(err);
    }
  
  });
  
  router.get("/",  verifyToken , async (req, res) => {
      return res.send(await Subject.find());
  })

  module.exports = router;