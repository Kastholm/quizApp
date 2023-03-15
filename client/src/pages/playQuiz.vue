<template>
  <section>
    <main class="container">
      <article>
        <!-- Welcome message -->
        <h1>Velkommen til quizGame {{ userName }}</h1>
        <h2>Her kan du spille quizzes du ikke endnu har fuldført</h2>
        <!-- Information about completed quizzes -->
        <h3>
          Allerede fuldførte quizzes, er ikke synlige her.<br />
          Men kan se på din historik side:
        </h3>
        <!-- Link to the user's history page -->
        <router-link to="/history"
          ><button>Se din historik</button></router-link
        >
        <!-- Display the total number of quizzes -->
        <p>Antall quizer: {{ quizCount }}</p>
        <!-- Prompt for creating a new quiz -->
        <h3 for="">Ønsker du at lave en ny quiz?</h3>
        <!-- Link to the quiz creation page -->
        <router-link to="/makeQuiz"><button>Lav en quiz</button></router-link>
        <br /><br />
        <!-- Category selection -->
        <h3>Se alle quizzes eller vælg kategori</h3>
        <label for="category-select">Vælg kategori:</label>
        <select id="category-select" v-model="selectedCategory">
          <option value="">Alle</option>
          <option v-for="category in categories" :value="category">
            {{ category }}
          </option>
        </select>
      </article>
      <!-- Display quizzes -->
      <div class="cardContainer" v-if="filteredQuizzes.length > 0">
        <QuizCard
          v-for="quiz in filteredQuizzes"
          :key="quiz._id"
          :quiz="quiz"
          @quiz-completed="removeCompletedQuiz"
          :userId="user._id"
          :category="quiz.category"
        />
      </div>
      <!-- Display message if no quizzes are found -->
      <div v-else>
        <p>Ingen quizzes fundet.</p>
      </div>
    </main>
  </section>
</template>

<script>
// Import QuizCard component and quizService
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
      // List of quiz categories
      categories: ["History", "Science", "Programming", "Sports", "Gaming"],
      quizCount: 0,
      user: null,
    };
  },
  created() {
    // Retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
      this.userName = user.name;
      this.Score = user.score;
    } else {
      // Redirect to the home page if no user is found
      this.$router.push("/");
    }
  },
  computed: {
    // Filter out completed quizzes
    notCompletedQuizzes() {
      if (this.user && this.user.completedQuizzes) {
        return this.quizzes.filter(
          (quiz) => !this.user.completedQuizzes.includes(quiz._id)
        );
      }
      return this.quizzes;
    },
    // Filter quizzes based on the selected category
    filteredQuizzes() {
      return this.notCompletedQuizzes.filter((quiz) =>
        this.selectedCategory ? quiz.category === this.selectedCategory : true
      );
    },
  },
  mounted() {
    // Fetch quizzes from the API using the quizService
    quizService
      .getQuizzes()
      .then((quizzes) => {
        // Map the quizzes data to the local quizzes data
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
      // Handle errors when fetching quizzes
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    // Remove a completed quiz from the list
    removeCompletedQuiz(quizId) {
      // Remove the quiz after a 2-second delay
      setTimeout(() => {
        this.quizzes = this.quizzes.filter((quiz) => quiz._id !== quizId);
      }, 2000);
    },
  },
};
</script>

<style></style>
