const router = require("express").Router();
const Topic = require("../models/Topic");
const {
    topicValidation
} = require("../validation");
const verifyToken = require("./verifyToken");


router.post("/", verifyToken , async (req, res) => {
    const {
        error,
        value
    } = topicValidation(req.body);
    if (error) return res.status(400).send(error);

    let topic = new Topic({
        title: req.body.title
    })
    
    try {
        topic = await topic.save();
        return res.send({
            ...topic._doc
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get("/",  verifyToken , async (req, res) => {
    return res.send(await Topic.find());
})

module.exports = router;
