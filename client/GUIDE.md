# Quiz App Guide

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

### `quizComposable.js`

This file contains the `quizService` class that interacts with the server to perform CRUD operations on quizzes. It uses the `axios` library to send HTTP requests to the server.

### `usersComposable.js`

This file contains the `userService` class that interacts with the server to perform CRUD operations on users. It also manages user authentication, score updates, and completed quizzes.

## Server Interaction

The app communicates with the server through the `axios` library, which is used to send HTTP requests. The server's API is available at `http://localhost:3000/api/`. The `quizComposable.js` and `usersComposable.js` files contain the necessary functions to interact with the server's API.

Feel free to explore the code and components to gain a deeper understanding of how the app works. Enjoy using the Quiz App!
