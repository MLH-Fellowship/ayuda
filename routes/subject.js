const router = require("express").Router();

const Subject = require("../models/Subject");
const Topic = require("../models/Topic");

const { subjectValidation } = require("../validation");
const verifyToken = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const { error, value } = subjectValidation(req.body);
  if (error) return res.status(400).send(error);



  let subject = new Subject({
      title: req.body.title
  })

  try {
    subject = await subject.save();
    return res.send({
      ...subject._doc,
    });
  } catch (err) {
    res.status(400).send(err);
  }

});

router.get("/",  verifyToken , async (req, res) => {
    return res.send(await Subject.find().populate("questions").populate("topics"));
})

module.exports = router;
