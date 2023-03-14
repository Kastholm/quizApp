<template>
  <div>
    <Nav />
    <section class="makeQuiz">
      <h1>Quiz {{ quizCount + 1 }}</h1>
      <form @submit.prevent="submitForm">
        <label for="question">Question:</label>
        <input type="text" id="question" v-model="question" required />
        <label for="answer1">Answer 1:</label>
        <input type="text" id="answer1" v-model="answer1" required />
        <label for="answer2">Answer 2:</label>
        <input type="text" id="answer2" v-model="answer2" required />
        <label for="answer3">Answer 3:</label>
        <input type="text" id="answer3" v-model="answer3" required />
        <label for="answer4">Answer 4:</label>
        <input type="text" id="answer4" v-model="answer4" required />
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
        <button type="submit">Submit</button>
      </form>
      <p v-if="message">{{ message }} , {{ answer }}</p>
    </section>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import quizService from "../composables/quizComposable.js";

export default {
  components: {
    Nav,
  },
  data() {
    return {
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: "",
      answers: ["answer1", "answer2", "answer3", "answer4"],
      message: "",
      quizCount: null,
    };
  },
  methods: {
    async submitForm() {
      const correctAnswerIndex = this.answers.indexOf(this.correctAnswer);
      try {
        await quizService.insertQuiz(
          `Quiz ${this.quizCount + 1}`,
          this.question,
          [this.answer1, this.answer2, this.answer3, this.answer4],
          correctAnswerIndex
        );
        this.question = "";
        this.answer1 = "";
        this.answer2 = "";
        this.answer3 = "";
        this.answer4 = "";
        this.correctAnswer = "";
        this.quizCount++;
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
