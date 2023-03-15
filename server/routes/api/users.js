/* -------------------------------------------------------------------------- */
/*          Loading all the modules and dependencies for the database         */
/* -------------------------------------------------------------------------- */
// Loading jsonwebtoken for authentication
const jwt = require("jsonwebtoken");
// Loading dotenv to access environment variables
require("dotenv").config();
// Loading express for handling API routes
const express = require("express");
// Loading mongodb to interact with MongoDB database
const mongodb = require("mongodb");
// Loading router to define and handle routes
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*            Connection to MongoDB Database and collection "users"           */
/* -------------------------------------------------------------------------- */
async function loadUsersCollection() {
  // Get the connection string from the .env file
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });
  // Return the collection "users"
  return client.db("Authentication").collection("users");
}

/* -------------------------------------------------------------------------- */
/*                  Routes for the API calls to the database                  */
/* -------------------------------------------------------------------------- */
// Get Users (for testing purposes)
router.get("/", async (req, res) => {
  const users = await loadUsersCollection();
  // Send the array of users as the response
  res.send(await users.find({}).toArray());
});

// Add User
router.post("/", async (req, res) => {
  // Load the users collection
  const users = await loadUsersCollection();
  const existingUser = await users.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).send("User with this email already exists.");
  }
  // Insert a new user into the collection with provided data
  await users.insertOne({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    categoryScores: {
      History: 0,
      Science: 0,
      Programming: 0,
      Sports: 0,
      Gaming: 0,
    },
    completedQuizzes: [],
    createdAt: new Date(),
  });
  const user = await users.findOne({ email: req.body.email });
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  // Send a 201 status code to the client indicating the user was created successfully
  res.status(201).json({ token });
});

// User login
router.post("/login", async (req, res) => {
  const users = await loadUsersCollection();
  const user = await users.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).send("Invalid email or password.");
  }

  if (req.body.password !== user.password) {
    return res.status(401).send("Invalid email or password.");
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
});

// Delete User
router.delete("/:id", async (req, res) => {
  // Load the users collection
  const users = await loadUsersCollection();
  // Delete the user with the ID that matches the ID in the URL
  await users.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  // Send a 200 status code to the client indicating the user was deleted successfully
  res.status(200).send();
});

// Change Password
router.post("/:id/changePassword", async (req, res) => {
  const users = await loadUsersCollection();
  // Find the user by ID
  const user = await users.findOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  // If the user is not found, return a 404 status code with an error message
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  // If the current password doesn't match the password in the database, return a 401 status code with an error message
  if (user.password !== req.body.currentPassword) {
    res.status(401).send("Current password is incorrect");
    return;
  }
  // If the current password matches the password in the database, update the password
  await users.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $set: { password: req.body.newPassword } }
  );
  // Return a 200 status code to indicate that the password was updated successfully
  res.status(200).send();
});
// Update the user's score in a specific category
router.patch("/:id/score", async (req, res) => {
  try {
    const users = await loadUsersCollection();
    // Get the category from the request body
    const category = req.body.category;
    // Prepare an increment object to update the user's score
    const increment = {};
    increment[`categoryScores.${category}`] = 1;

    // Find the user by ID and increment their score in the specified category
    const user = await users.findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $inc: increment },
      { returnOriginal: false }
    );

    // If the user is found and the score is updated, return the updated user data
    if (user.value) {
      res.status(200).send(user.value);
    } else {
      // If the user is not found, return a 404 status code with an error message
      res.status(404).send("User not found");
    }
  } catch (error) {
    // If there's an error, return a 500 status code with the error
    res.status(500).send(error);
  }
});

// Update completed quizzes
router.patch("/:id/completedQuizzes", async (req, res) => {
  const users = await loadUsersCollection();
  // Find the user by ID and update their completed quizzes list by adding the provided quiz ID
  await users.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $push: { completedQuizzes: req.body.quizId } }
  );
  // Send a 200 status code to indicate that the completed quizzes list was updated successfully
  res.status(200).send();
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
