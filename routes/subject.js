const router = require("express").Router();

const Subject = require("../models/Subject");
const Topic = require("../models/Topic");

const { subjectValidation } = require("../validation");
const verifyToken = require("./verifyToken");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", verifyToken, async (req, res) => {
  const { error, value } = subjectValidation(req.body);
  if (error) return res.status(400).send(error);

  let subject = new Subject({
    title: req.body.title,
  });

  try {
    subject = await subject.save();
    return res.send({
      ...subject._doc,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  return res.send(
    await Subject.find().populate("questions").populate("topics")
  );
});

router.get("/:subjectId", async (req, res) => {
  if (!ObjectId.isValid(req.params.subjectId))
    return res.status(400).send({ message: "Invalid Id" });

  const subject = await Subject.findById(req.params.subjectId)
    .populate("questions")
    .populate("topics");

  if (!subject) return res.status(404).send({ message: "Status Not Found" });
  return res.send(subject);
});

router.put("/:subjectId", async (req, res) => {
  if (!ObjectId.isValid(req.params.subjectId))
    return res.status(400).send({ message: "Invalid Id" });

  const body = req.body

  const subject = await Subject.findById(req.params.subjectId)

  if(!subject) {
    return res.status(400).send({ message: "No subject found for given ID" })
  }

  subject.title = body.title
  subject.topics = body.topics
  subject.questions = body.questions

  const savedSubject = await subject.save()
  return res.send(savedSubject)
})

router.delete("/:subjectId", verifyToken, async (req, res) => {
  if (!ObjectId.isValid(req.params.subjectId))
    return res.status(400).send({ message: "Invalid Id" });

  await Topic.findByIdAndDelete(req.params.subjectId)
  return res.status(204).end()
})



module.exports = router;
