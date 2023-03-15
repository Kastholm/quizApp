<template>
  <section>
    <main class="container">
      <article>
        <h1>Velkommen til quizGame {{ userName }}</h1>
        <h2>
          Her kan du spille quizzes du ikke endnu har fuldført
        </h2>
        <h3>Allerede fuldførte quizzes, er ikke synlige her.<br> Men kan se på din historik side:</h3>
        <router-link to="/history"><button>Se din historik</button></router-link>
        <p>Antall quizer: {{ quizCount }}</p>
        <h3 for="">Ønsker du at lave en ny quiz?</h3>
        <router-link to="/makeQuiz"><button>Lav en quiz</button></router-link>
        <br /><br />
        <h3>Se alle quizzes eller vælg kategori</h3>
        <label for="category-select">Vælg kategori:</label>
        <select id="category-select" v-model="selectedCategory">
          <option value="">Alle</option>
          <option v-for="category in categories" :value="category">
            {{ category }}
          </option>
        </select>
      </article>
      <div class="cardContainer" v-if="filteredQuizzes.length > 0">
        <QuizCard
          v-for="quiz in filteredQuizzes"
          :key="quiz._id"
          :quiz="quiz"
          @quiz-completed="removeCompletedQuiz"
        />
      </div>
      <div v-else>
        <p>Ingen quizzes fundet.</p>
      </div>
    </main>
  </section>
</template>

<script>
import QuizCard from "../components/QuizCard.vue";
import quizService from "../composables/quizComposable.js";
import { computed } from "vue";

export default {
  components: {
    QuizCard,
  },
  data() {
    return {
      quizzes: [],
      selectedCategory: "",
      categories: ["History", "Science", "Programming", "Sports", "Gaming"],
      quizCount: 0,
      user: null,
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
      this.userName = user.name;
      this.Score = user.score;
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    notCompletedQuizzes() {
      if (this.user && this.user.completedQuizzes) {
        return this.quizzes.filter(
          (quiz) => !this.user.completedQuizzes.includes(quiz._id)
        );
      }
      return this.quizzes;
    },
    filteredQuizzes() {
      return this.notCompletedQuizzes.filter((quiz) =>
        this.selectedCategory ? quiz.category === this.selectedCategory : true
      );
    },
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
          category: quiz.category,
          createdAt: quiz.createdAt,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  },
    methods: {
    removeCompletedQuiz(quizId) {
      this.quizzes = this.quizzes.filter((quiz) => quiz._id !== quizId);
    },
  },
};
</script>

<style>

</style>
