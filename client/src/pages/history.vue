<template>
  <main class="container">
    <!-- Greeting with user's name -->
    <div>
      <article>
        <h1>Hej {{ userName }}<br /></h1>
        <h2>Her kan du se din historik over alle quizzes du har deltaget i</h2>
        <!-- Category filter dropdown -->
        <label for="">Vælg kategori</label>
        <select v-model="selectedCategory">
          <option value="">All Categories</option>
          <!-- Loop through the list of categories -->
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
        </select>
        <!-- Display the number of completed quizzes in the selected category -->
        <h3>
          Du har fuldført <b>{{ filteredCompletedQuizzes.length }}</b> quizzes i
          valgte kategori
        </h3>
        <!-- Display the number of not completed quizzes in the selected category -->
        <h3>
          Der er
          <b style="color: #ff0000b5">{{
            filteredNotCompletedQuizzes.length
          }}</b>
          quizzes du ikke har fuldført endnu i valgte kategori
        </h3>
        <!-- Display the percentage of correct answers for each category -->
        <h2>Her ses hvor mange procent i kategorier du havde rigtigt</h2>
        <!-- Loop through the displayedCategoryScores object -->
        <div
          class="cardContainer statContainer"
          v-for="(score, category) in displayedCategoryScores"
          :key="category"
        >
          <h3>{{ category }}</h3>
          <span>
            <p>
              Correct answers: <b>{{ score }}</b>
            </p>
            <p>
              Percentage:
              <b>
                {{
                  completedQuizzesByCategory(category).length > 0
                    ? (
                        (score / totalQuizzesInCategory(category)) *
                        100
                      ).toFixed(2)
                    : 0
                }}%
              </b>
            </p>
          </span>
        </div>
      </article>
      <!-- Display a list of completed quizzes -->
      <h1>Completed Quizzes</h1>
      <div class="cardContainer">
        <!-- Loop through the list of filteredCompletedQuizzes -->
        <span
          style="pointer-events: none"
          v-for="quiz in filteredCompletedQuizzes"
          :key="quiz._id"
        >
          <!-- QuizCard component for each completed quiz -->
          <QuizCard :quiz="quiz" />
          <p>ID: {{ quiz._id }}</p>
        </span>
      </div>
      <!-- Display a list of uncompleted quizzes -->
      <h1>Uncompleted Quizzes</h1>
      <div class="cardContainer">
        <!-- Loop through the list of filteredNotCompletedQuizzes -->
        <span
          style="pointer-events: none"
          v-for="quiz in filteredNotCompletedQuizzes"
          :key="quiz._id"
        >
          <!-- QuizCard component for each uncompleted quiz -->
          <QuizCard :quiz="quiz" />
          <p>ID: {{ quiz._id }}</p>
        </span>
      </div>
    </div>
  </main>
</template>

<script>
import quizService from "../composables/quizComposable.js";
import QuizCard from "../components/QuizCard.vue";
import { ref, computed, watch } from "vue";

export default {
  components: {
    QuizCard,
  },
  setup() {
    /* -------------------------------------------------------------------------- */
    /*                           List of quiz categories                          */
    /* -------------------------------------------------------------------------- */
    const categories = ref([
      "History",
      "Science",
      "Programming",
      "Sports",
      "Gaming",
    ]);
    // User data fetched from localStorage
    const user = ref(JSON.parse(localStorage.getItem("user")));
    // All quizzes fetched from API
    const allQuizzes = ref([]);
    // Selected category filter
    const selectedCategory = ref("");
    /* -------------------------------------------------------------------------- */
    /*        Quiz fetching and filtering functions and computed properties       */
    /* -------------------------------------------------------------------------- */
    // Compute the list of completed quizzes for the user
    const completedQuizzes = computed(() => {
      if (user.value && user.value.completedQuizzes) {
        return allQuizzes.value.filter((quiz) =>
          user.value.completedQuizzes.includes(quiz._id)
        );
      }
      return [];
    });
    // Compute the list of not completed quizzes for the user
    const notCompletedQuizzes = computed(() => {
      if (user.value && user.value.completedQuizzes) {
        return allQuizzes.value.filter(
          (quiz) => !user.value.completedQuizzes.includes(quiz._id)
        );
      }
      return allQuizzes.value;
    });
    // Fetch all quizzes from the API
    const getAllQuizzes = async () => {
      try {
        const fetchedQuizzes = await quizService.getQuizzes();
        allQuizzes.value = fetchedQuizzes;
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    // Filter quizzes by the selected category
    const filterQuizzesByCategory = (quizzes) => {
      if (selectedCategory.value === "") {
        return quizzes;
      } else {
        return quizzes.filter(
          (quiz) => quiz.category === selectedCategory.value
        );
      }
    };
    // Compute the list of completed quizzes filtered by category
    const filteredCompletedQuizzes = computed(() => {
      return filterQuizzesByCategory(completedQuizzes.value);
    });
    // Compute the list of not completed quizzes filtered by category
    const filteredNotCompletedQuizzes = computed(() => {
      return filterQuizzesByCategory(notCompletedQuizzes.value);
    });
    // Compute the displayed category scores based on the selected category
    const displayedCategoryScores = computed(() => {
      if (selectedCategory.value === "") {
        return user.value.categoryScores;
      } else {
        const filteredCategoryScores = {};
        filteredCategoryScores[selectedCategory.value] =
          user.value.categoryScores[selectedCategory.value];
        return filteredCategoryScores;
      }
    });
    // Compute the total quizzes in the selected category
    const totalQuizzesInSelectedCategory = computed(() => {
      if (selectedCategory.value === "") {
        return 0;
      } else {
        return allQuizzes.value.filter(
          (quiz) => quiz.category === selectedCategory.value
        ).length;
      }
    });
    // Compute the total score for all categories
    const totalScore = computed(() => {
      let scoreSum = 0;
      for (const category in categoryScores.value) {
        scoreSum += categoryScores.value[category];
      }
      return scoreSum;
    });
    // Get the list of completed quizzes in a specific category
    const completedQuizzesByCategory = (category) => {
      if (user.value && user.value.completedQuizzes) {
        return allQuizzes.value.filter(
          (quiz) =>
            quiz.category === category &&
            user.value.completedQuizzes.includes(quiz._id)
        );
      }
      return [];
    };
    // Get the total number of quizzes in a specific category
    const totalQuizzesInCategory = (category) => {
      return allQuizzes.value.filter((quiz) => quiz.category === category)
        .length;
    };
    // Watch for changes in the user data in localStorage
    watch(
      () => JSON.parse(localStorage.getItem("user")),
      (newValue) => {
        user.value = newValue;
      }
    );
    // Fetch all quizzes on component setup
    getAllQuizzes();
    // Return the necessary values for use in the template
    return {
      user,
      selectedCategory,
      filteredCompletedQuizzes,
      filteredNotCompletedQuizzes,
      categories,
      displayedCategoryScores,
      totalQuizzesInSelectedCategory,
      completedQuizzes,
      completedQuizzesByCategory,
      totalQuizzesInCategory,
    };
  },
  // End of setup

  // When the component is created, get user data from localStorage
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userName = user.name;
      this.categoryScores = user.categoryScores;
      this.completedQuizzes = user.completedQuizzes;
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.statContainer {
  background: rgb(22, 24, 22);
  padding: 1em;
  margin-bottom: 0.3em;
}
.statContainer * {
  margin-bottom: 0;
}
</style>
