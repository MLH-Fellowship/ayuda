const router = require("express").Router();
const Topic = require("../models/Topic");

const Subject = require("../models/Subject");

const { topicValidation } = require("../validation");
const verifyToken = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const { error, value } = topicValidation(req.body);
  if (error) return res.status(400).send(error);

  let subject = await Subject.findById(req.body.subject);
  if (!subject) return res.status(404).send({ message: "Status Not Found" });

  let topic = new Topic({
    title: req.body.title,
    subject,
  });

  try {
    topic = await topic.save();

    subject = await Subject.findOneAndUpdate(
      { _id: req.body.subject },
      {
        $set: {
          topics: [...subject._doc.topics, topic],
        },
      },
      {
        new: true,
      }
    )
      .populate("questions")
      .populate("topics");

    return res.send({
      ...topic._doc,
      subject
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", verifyToken, async (req, res) => {
  return res.send(await Topic.find().populate("subject"));
});

module.exports = router;
