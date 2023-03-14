<template>
  <Nav />
  <section>
    <main class="container">
      <article>
        <h1>Velkommen til quizzen {{ userName }}</h1>
        <h2>
          Her kan du spille allerede eksisterende quizzes eller lave din egen
        </h2>
        <router-link to="/makeQuiz"><button>Lav en quiz</button></router-link>
      </article>
      <div v-if="quizzes.length > 0">
        <QuizCard v-for="quiz in quizzes" :key="quiz._id" :quiz="quiz" />
      </div>
      <div v-else>
        <p>No quizzes found.</p>
      </div>
    </main>
  </section>
</template>

<script>
import Nav from "../components/nav.vue";
import QuizCard from "../components/QuizCard.vue";
import quizService from "../composables/quizComposable.js";

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
    created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userName = user.name;
      this.Score = user.score;
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    quizService
      .getQuizzes()
      .then((quizzes) => {
        this.quizzes = quizzes.map((quiz) => ({
          _id: quiz._id,
          name: quiz.name,
          question: quiz.question,
          answers: quiz.answers,
          correctAnswer: quiz.correctAnswer,
          createdAt: quiz.createdAt,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style></style>
