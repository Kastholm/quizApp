<template>
  <div>
    <section class="makeQuiz">
      <h1>Quiz</h1>
      <!-- Form for creating a quiz -->
      <form @submit.prevent="submitForm">
        <label for="question">Question:</label>
        <input type="text" id="question" v-model="question" required />
        <!-- Answer input -->
        <label for="answer1">Answer 1:</label>
        <input type="text" id="answer1" v-model="answer1" required />
        <!-- Answer input -->
        <label for="answer2">Answer 2:</label>
        <input type="text" id="answer2" v-model="answer2" required />
        <!-- Answer input -->
        <label for="answer3">Answer 3:</label>
        <input type="text" id="answer3" v-model="answer3" required />
        <!-- Answer input -->
        <label for="answer4">Answer 4:</label>
        <input type="text" id="answer4" v-model="answer4" required />
        <!-- Correct answer selection -->
        <label for="correctAnswer">Correct Answer:</label>
        <select id="correctAnswer" v-model="correctAnswer" required>
          <option disabled value="">Please select one</option>
          <option
            v-for="(answer, index) in answers"
            :key="index"
            :value="answer"
          >
            {{ answer }}
          </option>
        </select>
        <!-- Category selection -->
        <label for="category">Category:</label>
        <select id="category" v-model="category" required>
          <option disabled value="">Please select one</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <!-- Submit button -->
        <button type="submit">Submit</button>
      </form>
      <!-- Display message after submitting the form -->
      <p v-if="message">{{ message }} , {{ answer }}</p>
    </section>
  </div>
</template>

<script>
// Import quizService to interact with the API
import quizService from "../composables/quizComposable.js";

export default {
  data() {
    return {
      category: "",
      // List of quiz categories
      categories: ["History", "Science", "Programming", "Sports", "Gaming"],
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: "",
      // List of answer keys
      answers: ["answer1", "answer2", "answer3", "answer4"],
      message: "",
    };
  },
  methods: {
    // Method to submit the form and create a new quiz
    async submitForm() {
      const correctAnswerIndex = this.answers.indexOf(this.correctAnswer);
      try {
        // Call the API to insert the quiz
        await quizService.insertQuiz(
          `Quiz`,
          this.category,
          this.question,
          [this.answer1, this.answer2, this.answer3, this.answer4],
          correctAnswerIndex
        );

        // Reset form fields
        this.category = "";
        this.question = "";
        this.answer1 = "";
        this.answer2 = "";
        this.answer3 = "";
        this.answer4 = "";
        this.correctAnswer = "";

        // Display success message
        this.message = "Quiz added successfully!";
      } catch (error) {
        console.error(error);
        this.message = "Failed to add quiz.";
      }
    },
  },
};
</script>

<style>
.makeQuiz {
  margin: 0 auto;
  width: 70%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
