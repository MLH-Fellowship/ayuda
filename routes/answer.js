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


router.get("/:answerId", async (req, res) => {
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

//Shared endpoint for upvoting/downvoting a single answer
router.put("/vote/:answerId", verifyToken, async (req, res) => {
    if (!ObjectId.isValid(req.params.answerId))
        return res.status(400).send({
            message: "Invalid Id"
        });

    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({
        message: "User Not Found"
    });

    const answer = await Answer.findById(req.params.answerId)
    const vote = answer.votes.find(vote => String(vote.user._id) === String(req.user._id))

    //Obtain owner of answer to update their points
    const answerOwner = await User.findById(answer.user) 
    if(!answerOwner) {
        console.log("Answer does not have a user. This is probably an issue")
    }
    
    //One vote per user
    //req.body.isUpvote represents whether it's an upvote or downvote
    if (vote) {
        console.log("Vote exists already for user " + req.user._id)

        if(vote.isUpvote !== req.body.isUpvote) {
            //If there's already a vote and we flip the vote value, have to actually change value by 2
            //1 for removal of original vote, and 1 in the same direction for addition of new vote
            if(vote.isUpvote && !req.body.isUpvote) {
                answerOwner.points = answerOwner.points - 2
            }
            else {
                answerOwner.points = answerOwner.points + 2
            }
        }

        vote.isUpvote = req.body.isUpvote
    }
    else {
        console.log("Vote does not exist already for user " + req.user._id)
        const newVote = {
            user: req.user,
            isUpvote: req.body.isUpvote
        }       

        answer.votes.push(newVote)

        //If upvote, add 1 to user points
        //Otherwise, subtract 1
        if(req.body.isUpvote) {
            answerOwner.points = answerOwner.points + 1
        }
        else {
            answerOwner.points = answerOwner.points - 1
        }
    }

    const savedAnswerOwner = await answerOwner.save()

    const savedAnswer = await answer.save()
    res.status(200).json(savedAnswer)
})

//Endpoint for removing user vote from a single answer
router.put("/deletevote/:answerId", verifyToken, async (req, res) => {
    if (!ObjectId.isValid(req.params.answerId))
        return res.status(400).send({
            message: "Invalid Id"
        });

    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({
        message: "User Not Found"
    });

    const answer = await Answer.findById(req.params.answerId)
    const voteIndex = answer.votes.findIndex(vote => String(vote.user._id) === String(req.user._id))

    //If the user has voted on the answer, remove the vote, otherwise don't do anything
    if (voteIndex >= 0) {
        console.log("Vote exists for user " + req.user._id)
        const isUpvote = answer.votes[voteIndex].isUpvote
        answer.votes.splice(voteIndex, 1) //delete vote by index

        const user = await User.findById(answer.user) 
        if(!user) {
            console.log("Answer does not have a user. This is probably an issue")
        }
        else {
            //If the removed vote is an upvote, remove the point from user points
            //Otherwise, add back the removed point
            if(isUpvote) {
                user.points = user.points - 1
            }
            else {
                user.points = user.points + 1
            }
            const savedUser = await user.save()
        }       
    }
    else {
        console.log("Vote does not exist for user " + req.user._id)
        //do nothing
    }

    const savedAnswer = await answer.save()
    res.status(200).json(savedAnswer)
})


router.put("/:answerId", async (req, res) => {
    if (!ObjectId.isValid(req.params.answerId))
        return res.status(400).send({ message: "Invalid Id" });

    const body = req.body

    const answer = await Topic.findById(req.params.answerId)

    if (!answer) {
        return res.status(400).send({ message: "No answer found for given ID" })
    }

    answer.text = body.text
    //can't change user
    //can't change question
    //can't change answer being replied to
    answer.replies = body.replies
    //can't change creation date
    //to change votes, use dedicated endpoint

    const savedAnswer = await answer.save()
    return res.send(savedAnswer)
})

router.delete("/:answerId", verifyToken, async (req, res) => {
    if (!ObjectId.isValid(req.params.answerId))
        return res.status(400).send({ message: "Invalid Id" });

    await Topic.findByIdAndDelete(req.params.answerId)
    return res.status(204).end()
})
module.exports = router;