/* -------------------------------------------------------------------------- */
/*          Loading all the modules and dependencies for the database         */
/* -------------------------------------------------------------------------- */
// Loading dotenv
require("dotenv").config();
// Loading express
const express = require("express");
// Loading mongodb
const mongodb = require("mongodb");
// Loading router
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*           Connection to MongoDB Database and collection "quizzes"          */
/* -------------------------------------------------------------------------- */
async function loadQuizzesCollection() {
  // Get the connection string from the .env file
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });
  // Return the collection "quizzes"
  return client.db("Quiz").collection("quizzes");
}

/* -------------------------------------------------------------------------- */
/*                  Routes for the API calls to the database                  */
/* -------------------------------------------------------------------------- */

// Get all the quizzes
router.get("/", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  res.send(await quizzes.find({}).toArray());
});

// Find the quiz by ID and return it
router.get("/:id", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  // Find the quiz by ID
  const quiz = await quizzes.findOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  // If the quiz is not found, return 404
  if (!quiz) {
    res.status(404).send("Quiz not found");
    return;
  }
  // If the quiz is found, return it
  res.send(quiz);
});

// Add a new quiz to the database
router.post("/", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  //Insert the quiz into the database
  await quizzes.insertOne({
    name: req.body.name,
    question: req.body.question,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer,
    createdAt: new Date(),
  });
  //Return 201 status code
  res.status(201).send();
});

// Get the number of quizzes
/* router.get("/count", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  const count = await quizzes.countDocuments({});
  res.send({ count });
}); */

// Update a quiz by ID
router.put("/:id", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  //Find the quiz by ID and update it
  await quizzes.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $set: { name: req.body.name, answers: req.body.answers } }
  );
  // Return 200 status code
  res.status(200).send();
});

// Delete a quiz by ID
router.delete("/:id", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  // Find the quiz by ID and delete it
  await quizzes.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
