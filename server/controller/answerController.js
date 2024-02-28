const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbconfig");

// Post answer
async function postAnswer(req, res) {
  const { answer } = req.body;
  const questionid = req.params.questionid;
  const { userid } = req.user;
  console.log(questionid);
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Provide answer field" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Please try again later" });
  }
}

// All answers
async function all_answers(req, res) {
  const questionId = req.params.questionid;
  try {
    const [answers] = await dbConnection.query(
      "SELECT * FROM answers WHERE questionId = ?",
      [questionId]
    );
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
}

module.exports = { postAnswer, all_answers };
