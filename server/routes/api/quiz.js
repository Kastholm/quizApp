/* -------------------------------------------------------------------------- */
/*          Loading all the modules and dependencies for the database         */
/* -------------------------------------------------------------------------- */
// Loading dotenv to access environment variables
require("dotenv").config();
// Loading express for handling API routes
const express = require("express");
// Loading mongodb to interact with MongoDB database
const mongodb = require("mongodb");
// Loading router to define and handle routes
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
  // Send the array of quizzes as the response
  res.send(await quizzes.find({}).toArray());
});

// Find the quiz by ID and return it
router.get("/:id", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  // Find the quiz by ID using the ObjectId method
  const quiz = await quizzes.findOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  // If the quiz is not found, return a 404 status code with an error message
  if (!quiz) {
    res.status(404).send("Quiz not found");
    return;
  }
  // If the quiz is found, send it as the response
  res.send(quiz);
});

// Add a new quiz to the database
router.post("/", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  // Insert the quiz into the database with the provided data
  await quizzes.insertOne({
    name: req.body.name,
    category: req.body.category,
    question: req.body.question,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer,
    createdAt: new Date(),
  });
  // Return a 201 status code to indicate that the quiz was created successfully
  res.status(201).send();
});

// Update a quiz by ID
router.put("/:id", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  // Find the quiz by ID and update the name and answers fields
  await quizzes.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $set: { name: req.body.name, answers: req.body.answers } }
  );
  // Return a 200 status code to indicate that the quiz was updated successfully
  res.status(200).send();
});

// Delete a quiz by ID
router.delete("/:id", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  // Find the quiz by ID and delete it from the database
  await quizzes.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  // Return a 200 status code to indicate that the quiz was deleted successfully
  res.status(200).send();
});

// Get the count of all quizzes
router.get("/count", async (req, res) => {
  const quizzes = await loadQuizzesCollection();
  // Get the total count of quizzes
  const count = quizzes.count({});
  // Send the count as a JSON object in the response
  res.json({ count });
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
