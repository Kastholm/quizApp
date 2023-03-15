<template>
  <div class="quiz-card" :class="{ 'fade-out': fadeOut }">
    <article>
      <h3>{{ quiz.question }}</h3>
      <div class="inputGrid">
        <span v-for="(answer, index) in quiz.answers" :key="index">
          <input
            type="radio"
            :id="'answer' + index"
            :value="answer"
            v-model="selectedAnswer"
          />
          <label :for="'answer' + index">{{ answer }}</label>
        </span>
      </div>
      <button @click="submitAnswer">Submit</button>
      <p class="answer" v-if="message">{{ message }}</p>
    </article>
  </div>
</template>

<script>
import userService from "../composables/usersComposable.js";
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
        // Removes the quiz from playQuiz.vue if the use completes it
        this.fadeOut = true;
        this.$emit("quiz-completed", this.quiz._id);
        this.message = "Correct answer!";
        this.$el.querySelector("article").classList.remove("incorrect");
        this.$el.querySelector("article").classList.add("correct");
        try {
          const userId = JSON.parse(localStorage.getItem("user"))._id;
          userService.updateScore(userId);
          userService.addCompletedQuiz(userId, this.quiz._id); // Add this line to update the user's completed quizzes on the server.
          const user = JSON.parse(localStorage.getItem("user"));
          user.score++;
          // Add the following lines to update the user's completed quizzes in localStorage.
          if (!user.completedQuizzes) {
            user.completedQuizzes = [];
          }
          user.completedQuizzes.push(this.quiz._id);
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error(error);
        }
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
.fade-out {
  opacity: 0;
  transition: opacity 1s ease;
}
.quiz-card {
  font-size: 1rem;
  line-height: 2.5em;
  border-radius: 10px;
  position: relative;
}
.quiz-card article h3 {
  min-height: 150px !important;
}
.quiz-card article {
  margin-bottom: 0em;
  margin-top: 0em;
  padding: 2em;
}
.inputGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}
.answer {
  bottom: -4%;
  position: absolute;
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
