/* -------------------------------------------------------------------------- */
/*                          Connection to the server                          */
/* -------------------------------------------------------------------------- */
// Connects to the server and sends the data from the form to the server
import axios from "axios";
const url = "http://localhost:3000/api/quiz";

/* -------------------------------------------------------------------------- */
/*                        Collecting data from the form                       */
/* -------------------------------------------------------------------------- */
// Collects the data from the form and sends it to the server
class quizService {
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
      }
    });
  }
  // Create Post - this is the function that sends the data to the server
  static insertQuiz(name, question, answers, correctAnswerIndex) {
    const correctAnswer = answers[correctAnswerIndex];
    return axios.post(url, {
      name: `Quiz`,
      question: question,
      answers: answers,
      correctAnswer: correctAnswer,
      createdAt: new Date(),
    });
  }
  // Delete Post - this is the function that deletes the data from the server
  static deleteQuiz(id) {
    return axios.delete(`${url}/${id}`);
  }
}
/* -------------------------------------------------------------------------- */
/*            Exporting the class so it can be used in other files            */
/* -------------------------------------------------------------------------- */
export default quizService;
