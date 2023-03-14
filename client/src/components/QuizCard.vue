<template>
  <div class="quiz-card">
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
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
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
  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  methods: {
    // submitAnswer method that checks if the selected answer is the same as the correct answer
    submitAnswer() {
      if (this.selectedAnswer === this.quiz.correctAnswer) {
        this.message = "Correct answer!";
      } else {
        this.message = "Incorrect answer. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.quiz-card {
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
