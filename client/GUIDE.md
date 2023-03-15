# Guide to the Quiz App Server

This guide will help you understand how the Quiz App works, including the structure of the project, the purpose of each file, and how data is fetched and used throughout the application.

## Project Server Structure

The project is structured as follows:

- `server.js`: Main entry point for the server.
- `routes/`: Contains API routes.
  - `api/`: Contains API route files.
    - `quiz.js`: Contains Quiz API routes.
    - `users.js`: Contains User API routes.
- `GUIDE.md`: This guide file.

## Server.js

The `server.js` file is the main entry point for the server. It loads the required modules, configures middleware, defines routes for the API calls, and starts the server on a specified port.

The server uses Express, Body Parser, and CORS middleware to create a flexible, secure, and easy-to-use RESTful API.

## Routes

The `routes/` directory contains the API routes for the application. The `api/` subdirectory contains two route files, `quiz.js` and `users.js`.

### Quiz API Routes (quiz.js)

The `quiz.js` file contains the API routes for handling quizzes. It connects to the MongoDB "Quiz" database and the "quizzes" collection. The file provides routes to:

- Get all quizzes
- Get a quiz by ID
- Add a new quiz
- Update a quiz by ID
- Delete a quiz by ID
- Get the count of all quizzes

### User API Routes (users.js)

The `users.js` file contains the API routes for handling users. It connects to the MongoDB "Authentication" database and the "users" collection. The file provides routes to:

- Get all users (for testing purposes)
- Add a user
- Delete a user
- Change a user's password
- Update a user's score in a specific category
- Update a user's list of completed quizzes

# Guide to the Quiz App Client

This document will walk you through how the app works and where the different pages get their data and information from. The app is built using Vue.js and consists of several components and helper files to manage user interaction and data handling.

## Components

### `App.vue`

This is the main component of the application. It contains the basic structure of the app, such as the header, main content, and footer. It also manages the routing between different pages using Vue Router.

### `Login.vue`

This component handles the user login functionality. It sends a request to the server to authenticate the user and store their information in the browser's local storage. The `usersComposable.js` file is used to interact with the server.

### `Signup.vue`

This component allows users to create a new account by entering their email, name, and password. The `usersComposable.js` file is used to send the new user's data to the server.

### `Settings.vue`

In this component, users can update their email, name, and password. It uses the `usersComposable.js` file to interact with the server.

### `Welcome.vue`

This component displays a welcome message to the logged-in user and provides options to play or create a new quiz. It retrieves the user's data from local storage and redirects to the login page if no user is found.

### `QuizCard.vue`

This component is responsible for displaying a single quiz question and handling user interactions. It uses the `usersComposable.js` file to update the user's score and completed quizzes both on the server and in local storage.

## Composables

The `composables/` directory contains the service files for the application.

### quizComposable.js

The quizComposable.js file contains the quizService class that interacts with the server to perform CRUD operations on quizzes. This class is used by the application to fetch and manipulate quiz data from the server.

The quizService class provides methods for:

- Getting all quizzes
- Getting a quiz by ID
- Creating a new quiz
- Updating a quiz by ID
- Deleting a quiz by ID
- Getting the count of all quizzes

This class uses the axios library to send HTTP requests to the server, and it is exported and used by other parts of the application to interact with the Quiz API.

### `usersComposable.js`

The `usersComposable.js` file contains a class for handling user-related API calls. This class is used by the application to fetch and manipulate data from the server.

The `userService` class provides methods for:

- Getting users
- Inserting a user
- Deleting a user
- Updating a user's score
- Adding a completed quiz for a user

This class is exported and used by other parts of the application to interact with the User API.

## Data Fetching and Usage

The application uses the `userService` class to fetch and manipulate data from the server. The various pages in the application make use of the methods provided by this class to get the necessary data and perform the required actions. For example, when a user completes a quiz, the application calls the `addCompletedQuiz()` method to update the user's list of completed quizzes in the database.

In summary, the Quiz App consists of a server, API routes, and a service class to handle data fetching and manipulation. The different pages in the application use the `userService` class to interact with the API and get the required data and information.

## Server Interaction

The app communicates with the server through the `axios` library, which is used to send HTTP requests. The server's API is available at `http://localhost:3000/api/`. The `quizComposable.js` and `usersComposable.js` files contain the necessary functions to interact with the server's API.

Feel free to explore the code and components to gain a deeper understanding of how the app works. Enjoy using the Quiz App!
