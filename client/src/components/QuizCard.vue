<template>
  <div class="quiz-card">
    <article>
      <h2>{{ quiz.question }}</h2>
      <div v-for="(answer, index) in quiz.answers" :key="index">
        <input
          type="radio"
          :id="'answer' + index"
          :value="answer"
          v-model="selectedAnswer"
        />
        <label :for="'answer' + index">{{ answer }}</label>
      </div>
      <button @click="submitAnswer">Submit</button>
      <p class="answer" v-if="message">{{ message }}</p>
    </article>
  </div>
</template>

<script>
import userService from "../composables/signUp.js";
export default {
  // props are used to pass data from the parent component to the child component
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
  // data is used to store data that is specific to the component
  data() {
    return {
      selectedAnswer: "",
      message: "",
    };
  },
    created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userName = user.name;
      this.Score = user.score;
    } else {
      this.$router.push("/");
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  methods: {
    submitAnswer() {
      if (this.selectedAnswer === this.quiz.correctAnswer) {
        this.message = "Correct answer!";
        this.$el.querySelector("article").classList.remove("incorrect");
        this.$el.querySelector("article").classList.add("correct");
      } else {
        this.message = "Incorrect answer. Please try again.";
        this.$el.querySelector("article").classList.remove("correct");
        this.$el.querySelector("article").classList.add("incorrect");
      }
    },
  },
};
</script>

<style scoped>
.quiz-card {
  font-size: 1.4rem;
  line-height: 2.5em;
  margin-bottom: 1rem;
  border-radius: 10px;
}
.quiz-card button {
  margin-top: 2rem;
}
.correct {
  background: rgba(0, 128, 0, 0.316);
}
.incorrect {
  background: rgba(255, 0, 0, 0.276);
}
</style>
