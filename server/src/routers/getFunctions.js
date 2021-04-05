const Question = require("../../db/models/question");

async function getUserId(email) {
  const user = await User.findOne({
    email: email,
  });
  return user._id;
}

async function getQuestionId(uniqueId) {
  const question = await Question.findOne({
    uniqueId
  });
  return question._id;
}

const functions = {
  getUserId,
  getQuestionId,

}

module.exports = functions;