/* -------------------------------------------------------------------------- */
/*           Loading all the modules and dependencies for the server          */
/* -------------------------------------------------------------------------- */
// Loading Express
const express = require("express");
// Loading HTTP module
const http = require("http");
// Loading Body Parser
const bodyParser = require("body-parser");
// Loading CORS (Cross-Origin Resource Sharing)
const cors = require("cors");
// Creating an Express app
const app = express();

/* -------------------------------------------------------------------------- */
/*                 Running middleware for body parser and CORS                */
/* -------------------------------------------------------------------------- */
// Configuring Body Parser middleware to parse JSON data
app.use(bodyParser.json());

/* -------------------------------------------------------------------------- */
/*                  Configure CORS to accept every connection                 */
/* -------------------------------------------------------------------------- */
// Configuring CORS middleware to allow any origin and various HTTP methods
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
  })
);

/* -------------------------------------------------------------------------- */
/*                   Routes for the API calls to the server                   */
/* -------------------------------------------------------------------------- */
// Importing User routes from the "routes/api/users" module
const users = require("./routes/api/users");
// Mounting the User routes at "/api/users" path
app.use("/api/users", users);

// Importing Quiz routes from the "routes/api/quiz" module
const quiz = require("./routes/api/quiz");
// Mounting the Quiz routes at "/api/quiz" path
app.use("/api/quiz", quiz);

/* -------------------------------------------------------------------------- */
/*                    Setting port for the server to run on                   */
/* -------------------------------------------------------------------------- */
// Setting the port for the server, either from the environment variable or defaulting to 3000
const port = process.env.PORT || 3000;
// Starting the server and listening for incoming connections on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`));
