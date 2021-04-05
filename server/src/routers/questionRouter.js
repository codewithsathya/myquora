const express = require("express");
const Question = require("../../db/models/question");
const User = require("../../db/models/user");
const googleAuth = require('../middleware/googleAuth')

const router = new express.Router();

router.post("/question", googleAuth, async (req, res) => {
  try {
        const userObjectId = await getUserId(req.body.email);
        const newQuestion = new Question({
                content: req.body.question,
                author: userObjectId,
                tags: req.body.tags
        });
        newQuestion.save();
        res.status(201).send({ question: newQuestion });

  } catch (e) {
        res.status(500).send({ error: e });
  }
});

router.get('/home_questions', googleAuth, async (req, res) => {
        try{
                const { limit: limitStr, date: dateStr } = req.query
                const limit = parseInt(limitStr)
                const date = parseInt(dateStr)
                const questionList = await Question.find({
                        creationTime: { $lt: date }
                }).sort({
                        creationTime: -1
                }).limit(limit)
                const totalQuestionListSaturated = questionList.length !== limit
                res.send({ questionList, totalQuestionListSaturated })

        }catch(e){
                res.status(404).send({ error: e })
        }
})

router.post('/follows_questions', googleAuth, async (req, res) => {
        try{
                const limit = parseInt(req.query.limit)
                const { skip: skipStr, date: dateStr } = req.query
                const date = parseInt(dateStr)
                const skip = parseInt(skipStr)
                const { tags, tagsQuestionListSaturated: isTagListSaturated } = req.body
                var questionList = []
                if((isTagListSaturated !== true)||(tags !== []))
                {
                        questionList = await Question.find({
                                tags: { $elemMatch: { $in: tags } },
                                creationTime: { $lt: date }   
                        }).sort({
                                creationTime: -1
                        }).limit(limit)
                }
                /* skip value to not be computed. Status of tag question saturation sent to React to decide
                skip value will decide the usage of skip */
                const questionListLength = questionList.length
                const tagsQuestionListSaturated = (tags.length !== 0) && (questionListLength !== limit)

                if(questionListLength < limit)
                {
                        const otherQuestionList = await Question.find({
                                creationTime: { $lt: date },
                                tags: {$not: { $elemMatch: { $in: tags } }}
                        }).sort({
                                creationTime: -1
                        }).limit(limit-questionListLength)
                        questionList = questionList.concat(otherQuestionList)
                }

                const totalQuestionListSaturated = questionList.length !== limit

                res.status(200).send({
                        questionList,
                        tagsQuestionListSaturated,
                        totalQuestionListSaturated
                })

        }catch (e){
                res.status(404).send({error: e})
        }
})

router.post('/tag_questions', googleAuth, async (req, res) => {
        const {limit: limitStr, date:dateStr} = req.query
        const tags = req.body.tag
        try{
                const limit = parseInt(limitStr)
                const date = parseInt(dateStr)
                const questionList = await Question.find({
                        tag: { $all: tags }
                }).limit(limit).sort({
                        creationTime: -1
                })
                const questionListSaturated = questionList.length !== limit
                res.send({
                        questionList,
                        questionListSaturated
                })

        }catch(e){
                res.status(404).send({ error: e })
        }
})

router.get('/trending_questions', googleAuth, async (req, res) => {
        try{
                const questionList = await Question.find({}).sort({
                        bloomIndex: -1
                }).limit(5).sort({
                        createdAt: -1
                })
                res.send({ questionList })

        }catch(e){
                res.status(500).send({ error: e })
        }
})

router.get('/unanswered_question', googleAuth, async (req, res) => {
        try{
                var questionList = await Question.find({
                        isAnswered: false
                })
                const numQuestions = questionList.length
                if(numQuestions !== 0)
                {
                        const randIndex = generateRandNum(numQuestions)
                        const question = questionList[randIndex]
                        res.send({ question })
                }
                else
                {
                        questionList = await Question.find({}).sort({
                                createdAt: -1
                        }).limit(1)
                        const question = questionList[0]
                        res.send({ question })
                }
        }catch(e){
                res.status(500).send({ error: e })
        }
})

async function getUserId(email) {
  const user = await User.findOne({
    email,
  });
  return user._id;
}

const generateRandNum = upperLimit => {
        const initRandFloat = Math.random()
        const result = Math.floor(upperLimit * initRandFloat)
        return result
}

module.exports = router;
