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
  res.send(await users.find({}).toArray());
});

// Add User
router.post("/", async (req, res) => {
  // post request to add a post
  // load the users collection
  const users = await loadUsersCollection();
  await users.insertOne({
    // insert a new post into the collection
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
  // send a 201 status code to the client
  res.status(201).send();
});

// Delete User
router.delete("/:id", async (req, res) => {
  // :id is a parameter
  // load the users collection
  const users = await loadUsersCollection();
  // delete the post with the id that matches the id in the url
  await users.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  // send a 200 status code to the client
  res.status(200).send();
});

// Change Password
router.post("/:id/changePassword", async (req, res) => {
  const users = await loadUsersCollection();
  const user = await users.findOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  // if the user is not found, return 404
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  // if the current password is not matching the password in the database, return 401
  if (user.password !== req.body.currentPassword) {
    res.status(401).send("Current password is incorrect");
    return;
  }
  // if the current password is matching the password in the database, update the password
  await users.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $set: { password: req.body.newPassword } }
  );
  // return 200 status code
  res.status(200).send();
});
router.patch("/:id/score", async (req, res) => {
  try {
    const users = await loadUsersCollection();
    const category = req.body.category;
    const increment = {};
    increment[`categoryScores.${category}`] = 1;
    const user = await users.findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $inc: increment },
      { returnOriginal: false }
    );
    if (user.value) {
      res.status(200).send(user.value);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update completed quizzes
router.patch("/:id/completedQuizzes", async (req, res) => {
  const users = await loadUsersCollection();
  // Find the user by ID and update their completed quizzes list
  await users.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $push: { completedQuizzes: req.body.quizId } }
  );
  res.status(200).send();
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */

module.exports = router;
