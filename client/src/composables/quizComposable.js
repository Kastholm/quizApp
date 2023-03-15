/* -------------------------------------------------------------------------- */
/*                          Connection to the server                          */
/* -------------------------------------------------------------------------- */
// Connects to the server and sends the data from the form to the server
import axios from "axios";
const url = "http://localhost:3000/api/quiz";

// Checking post count for development purposes
axios
  .get("http://localhost:3000/api/quiz/")
  .then((response) => {
    console.log(`There are ${response.data.length} quizzes`);
  })
  .catch((error) => {
    console.error(error);
  });
/* -------------------------------------------------------------------------- */
/*                        Collecting data from the form                       */
/* -------------------------------------------------------------------------- */
// Collects the data from the form and sends it to the server
class quizService {
  // Function to get all quizzes from the server
  static getQuizzes() {
    // returning a promise so that the data can be used in other files
    return new Promise(async (resolve, reject) => {
      // try catch block to catch any errors
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((quiz) => ({
            ...quiz,
            createdAt: new Date(quiz.createdAt),
          }))
        );
        // If promise is rejected, return the error
      } catch (err) {
        reject(err);
        return [];
      }
    });
  }

  // Function to create a new quiz and send it to the server
  static insertQuiz(name, category, question, answers, correctAnswerIndex) {
    const correctAnswer = answers[correctAnswerIndex];
    return axios.post(url, {
      name: Quiz,
      category: category,
      question: question,
      answers: answers,
      correctAnswer: correctAnswer,
      createdAt: new Date(),
    });
  }

  // Function to delete a quiz from the server
  static deleteQuiz(id) {
    return axios.delete(`${url}/${id}`);
  }
}
/* -------------------------------------------------------------------------- */
/*            Exporting the class so it can be used in other files            */
/* -------------------------------------------------------------------------- */
export default quizService;
