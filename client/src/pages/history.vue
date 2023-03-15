<template>
  <main class="container">
    <div>
      <article>
        <h1>Hej {{ userName }}<br /></h1>
        <h2>Her kan du se din historik over alle quizzes du har deltaget i</h2>
        <label for="">Vælg kategori</label>
        <select v-model="selectedCategory">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
          <!-- Add more categories as options here -->
        </select>
        <h3>
          Du har fuldført <b>{{ filteredCompletedQuizzes.length }}</b> quizzes i
          valgte kategori
        </h3>
        <h3>
          Der er
          <b style="color: #ff0000b5">{{
            filteredNotCompletedQuizzes.length
          }}</b>
          quizzes du ikke har fuldført endnu i valgte kategori
        </h3>
        <h2>Her ses hvor mange procent i kategorier du havde rigtigt</h2>
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
            <p >
              Percentage:<b>
                {{
                  (
                    (categoryScores[selectedCategory] /
                      totalQuizzesInSelectedCategory) *
                    100
                  ).toFixed(2)
                }}%</b
              >
            </p>
          </span>
        </div>

        <!--    <div v-if="selectedCategory && categoryScores[selectedCategory]">
          <h3>{{ selectedCategory }}</h3>
          <p>Correct answers: {{ categoryScores[selectedCategory] }}</p>
          <p>
            Percentage:
            {{
              (
                (categoryScores[selectedCategory] /
                  totalQuizzesInSelectedCategory) *
                100
              ).toFixed(2)
            }}%
          </p>
        </div> -->
      </article>

      <h1>Completed Quizzes</h1>
      <div class="cardContainer">
        <span
          style="pointer-events: none"
          v-for="quiz in filteredCompletedQuizzes"
          :key="quiz._id"
        >
          <QuizCard :quiz="quiz" />
          <p>ID: {{ quiz._id }}</p>
        </span>
      </div>
      <h1>Uncompleted Quizzes</h1>
      <div class="cardContainer">
        <span
          style="pointer-events: none"
          v-for="quiz in filteredNotCompletedQuizzes"
          :key="quiz._id"
        >
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
    const categories = ref([
      "History",
      "Science",
      "Programming",
      "Sports",
      "Gaming",
    ]);
    const user = ref(JSON.parse(localStorage.getItem("user")));
    const allQuizzes = ref([]);
    const selectedCategory = ref("");

    const completedQuizzes = computed(() => {
      if (user.value && user.value.completedQuizzes) {
        return allQuizzes.value.filter((quiz) =>
          user.value.completedQuizzes.includes(quiz._id)
        );
      }
      return [];
    });

    const notCompletedQuizzes = computed(() => {
      if (user.value && user.value.completedQuizzes) {
        return allQuizzes.value.filter(
          (quiz) => !user.value.completedQuizzes.includes(quiz._id)
        );
      }
      return allQuizzes.value;
    });

    const getAllQuizzes = async () => {
      try {
        const fetchedQuizzes = await quizService.getQuizzes();
        allQuizzes.value = fetchedQuizzes;
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const filterQuizzesByCategory = (quizzes) => {
      if (selectedCategory.value === "") {
        return quizzes;
      } else {
        return quizzes.filter(
          (quiz) => quiz.category === selectedCategory.value
        );
      }
    };

    const filteredCompletedQuizzes = computed(() => {
      return filterQuizzesByCategory(completedQuizzes.value);
    });

    const filteredNotCompletedQuizzes = computed(() => {
      return filterQuizzesByCategory(notCompletedQuizzes.value);
    });

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

    const totalQuizzesInSelectedCategory = computed(() => {
      if (selectedCategory.value === "") {
        return 0;
      } else {
        return allQuizzes.value.filter(
          (quiz) => quiz.category === selectedCategory.value
        ).length;
      }
    });

    watch(
      () => JSON.parse(localStorage.getItem("user")),
      (newValue) => {
        user.value = newValue;
      }
    );
    getAllQuizzes();
    return {
      user,
      selectedCategory,
      filteredCompletedQuizzes,
      filteredNotCompletedQuizzes,
      categories,
      displayedCategoryScores,
      totalQuizzesInSelectedCategory,
    };
  },
  //setup end
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
