/* -------------------------------------------------------------------------- */
/*           Loading all the modules and dependencies for the server          */
/* -------------------------------------------------------------------------- */
// Loading Express
const express = require("express");
// Http request
const http = require("http");
// Loading Body Parser
const bodyParser = require("body-parser");
// Loading cors
const cors = require("cors");
// run express
const app = express();
// Loading passport for authentication and authorization of users
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
/* -------------------------------------------------------------------------- */
/*                 Running middleware for body parser and cors                */
/* -------------------------------------------------------------------------- */
// Body parser middleware
app.use(bodyParser.json());
/* -------------------------------------------------------------------------- */
/*                  Configure cors to accept every connection                 */
/* -------------------------------------------------------------------------- */
// Cors middleware
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
  })
);
/* -------------------------------------------------------------------------- */
/*               Configure passport.js to use the local strategy              */
/* -------------------------------------------------------------------------- */
passport.use(new LocalStrategy({
  usernameField: 'email', // the field that holds the email address in the request body
  passwordField: 'password' // the field that holds the password in the request body
}, async (email, password, done) => {
  try {
    const users = await loadUsersCollection();
    const user = await users.findOne({ email: email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

/* -------------------------------------------------------------------------- */
/*                   Routes for the API calls to the server                   */
/* -------------------------------------------------------------------------- */
// User database
const users = require("./routes/api/users");
app.use("/api/users", users);
// Quiz database
const quiz = require("./routes/api/quiz");
app.use("/api/quiz", quiz);

/* -------------------------------------------------------------------------- */
/*                    Setting port for the server to run on                   */
/* -------------------------------------------------------------------------- */
// Setting port
const port = process.env.PORT || 3000;
// Listening to port
app.listen(port, () => console.log(`Server started on port ${port}`));
