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
