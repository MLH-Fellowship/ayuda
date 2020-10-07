const router = require("express").Router();

const Subject = require("../models/Subject");
const Topic = require("../models/Topic");
const Question = require("../models/Question");
const User = require("../models/User");
const Answer = require("../models/Answer");

const {
    answerValidation
} = require("../validation");
const verifyToken = require("./verifyToken");
const ObjectId = require("mongoose").Types.ObjectId;


router.post("/", verifyToken, async (req, res) => {
    const {
        error,
        value
    } = answerValidation(req.body);
    if (error) return res.status(400).send(error);

    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({
        message: "Status Not Found"
    });

    let question = await Question.findById(req.body.question);
    if (!question) return res.status(404).send({
        message: "Question Not Found"
    });

    let answerBeingRepliedTo;
    if (req.body.answerBeingRepliedTo) {
        answerBeingRepliedTo = await Answer.findById(req.body.answerBeingRepliedTo);
        if (!answerBeingRepliedTo) return res.status(404).send({
            message: "Answer Not Found"
        });
    }

    let answer = new Answer({
        text: req.body.text,
        user,
        question,
        answerBeingRepliedTo

    })

    try {
        answer = await answer.save();

        question = await Question.findOneAndUpdate({
            _id: req.body.question
        }, {
            $set: {
                answers: [...question._doc.answers, answer]
            }
        }, {
            new: true
        }).populate("answers").populate("topic").populate("subject").populate("user");


        user = await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                answers: [...user._doc.answers, answer]
            }
        }, {
            new: true
        }).populate("answers").populate("questions");

        if (req.body.answerBeingRepliedTo) {
            answerBeingRepliedTo = await Answer.findOneAndUpdate({
                _id: req.body.answerBeingRepliedTo
            }, {
                $set: {
                    replies: [...answerBeingRepliedTo._doc.replies, answer]
                }
            }, {
                new: true
            })
        }

        return res.send({
            ...answer,
            question,
            user,
            answerBeingRepliedTo
        })

    } catch (err) {
        res.status(400).send(err);
    }
})


router.get("/:answerId", verifyToken, async (req, res) => {
    if (!ObjectId.isValid(req.params.answerId))
        return res.status(400).send({
            message: "Invalid Id"
        });

    const answer = await Answer.findById(req.params.answerId)
        .populate("replies")
        .populate("user")
        .populate("question")
        .populate("answerBeingRepliedTo");
    if (!answer) return res.status(404).send({
        message: "Answer Not Found"
    });
    return res.send(answer);
})


module.exports = router;