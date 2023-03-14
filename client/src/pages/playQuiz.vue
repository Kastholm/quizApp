<template>
  <Nav />
  <section>
    <h1>Play Quiz</h1>
    <div v-if="quizzes.length > 0">
      <QuizCard v-for="quiz in quizzes" :key="quiz._id" :quiz="quiz.name" />
    </div>
    <div v-else>
      <p>No quizzes found.</p>
    </div>
  </section>
</template>

<script>
import Nav from "../components/nav.vue";
import QuizCard from "../components/QuizCard.vue";
import quizService from "../composables/quizzes.js";

export default {
  components: {
    Nav,
    QuizCard,
  },
  data() {
    return {
      quizzes: [],
    };
  },
  mounted() {
    quizService
      .getQuizzes()
      .then((quizzes) => {
        this.quizzes = quizzes.map((quiz) => ({
          name: quiz.name,
          answers: quiz.answers,
          correctAnswer: quiz.correctAnswer,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style></style>
