const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();

const Answer = require("../../db/models/answer");
const User = require("../../db/models/user");
const googleAuth = require('../middleware/googleAuth')


router.post("/answer", googleAuth, async (req, res) => {
        const { answer: content, question: questionObjectIdStr } = req.body
        try {
                const userObjectId = await getUserId(req.body.email);
                const questionObjectId = mongoose.Types.ObjectId(questionObjectIdStr)
                const newAnswer = new Answer({
                        author: userObjectId,
                        content,
                        question: questionObjectId 
                });
                newAnswer.save();
                res.status(201).send({
                        answer: newAnswer
                });
        } catch (e) {
                res.status(500).send({ error: e });
        }
});

router.patch('/upvote', googleAuth, async (req, res) => {
        const { answer: answerObjectIdStr } = req.body
        try{
                const userObjectId = await getUserId(req.body.email)
                const answer = await Answer.findById(answerObjectIdStr)

                if(!answer.upvotes.includes(userObjectId))
                {
                        answer.upvotes = [...answer.upvotes, userObjectId]
                        await answer.save()
                        res.send({
                                upvoteActionStatus: true
                        })
                }
                else
                        res.send({
                                upvoteActionStatus: false
                        })
        }catch(e){
                res.send({ error: e })
        }
})

router.patch('/downvote', googleAuth, async (req, res) => {
        const { answer: answerObjectIdStr } = req.body
        try{
                const userObjectId = await getUserId(req.body.email)
                const answer = await Answer.findById(answerObjectIdStr)

                if(!answer.downvotes.includes(userObjectId))
                {
                        answer.downvotes = [...answer.downvotes, userObjectId]
                        await answer.save()
                        res.send({
                                downvoteActionStatus: true
                        })
                }
                else
                        res.send({
                                downvoteActionStatus: false
                        })
        }catch(e){
                res.send({ error: e })
        }
})

async function getUserId(email) {
        const user = await User.findOne({
                email
        });
        return user._id;
}

async function getQuestionId(uniqueId) {
        const question = await Question.findOne({
                uniqueId,
        });
        return question._id;
}

module.exports = router;
