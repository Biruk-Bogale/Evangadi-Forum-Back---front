const express = require("express");
const router = express.Router();

//questions controllers
const { askQuestion } = require("../controller/questionController");

router.get("/all-questions", (req, res) => {
  res.send("all questions");
});

router.post("/askQuestions", askQuestion);

module.exports = router;
