const router = require("express").Router();
const Topic = require("../models/Topic");

const Subject = require("../models/Subject");

const { topicValidation } = require("../validation");
const verifyToken = require("./verifyToken");
const ObjectId = require("mongoose").Types.ObjectId;

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
      subject,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  return res.send(await Topic.find().populate("subject").populate("questions"));
});

router.get("/:topicId", async (req, res) => {
  if (!ObjectId.isValid(req.params.topicId))
    return res.status(400).send({ message: "Invalid Id" });

  const topic = await (await Topic.findById(req.params.topicId).populate("questions").populate("subject"));
  if (!topic) return res.status(404).send({ message: "Topic Not Found" });
  
  return res.send(topic);
});

router.put("/:topicId", async (req, res) => {
  if (!ObjectId.isValid(req.params.topicId))
    return res.status(400).send({ message: "Invalid Id" });

  const body = req.body

  const topic = await Topic.findById(req.params.topicId)

  if(!topic) {
    return res.status(400).send({ message: "No topic found for given ID" })
  }

  topic.title = body.title
  topic.questions = body.questions
  topic.subject = body.subject

  const savedTopic = await topic.save()
  return res.send(savedTopic)
})

router.delete("/:topicId", verifyToken, async (req, res) => {
  if (!ObjectId.isValid(req.params.topicId))
    return res.status(400).send({ message: "Invalid Id" });

  await Topic.findByIdAndDelete(req.params.topicId)
  return res.status(204).end()
})

module.exports = router;
