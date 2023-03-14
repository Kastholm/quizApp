import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/index.vue";
import SignUp from "@/pages/signup.vue";
import Welcome from "@/pages/welcome.vue";
import Settings from "@/pages/settings.vue";
import playQuiz from "@/pages/playQuiz.vue";
import makeQuiz from "@/pages/makeQuiz.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
      
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: { requiresAuth: true },
    },
    {
      path: "/playquiz",
      name: "playQuiz",
      component: playQuiz,
      meta: { requiresAuth: true },
    },
    {
      path: "/makequiz",
      name: "makeQuiz",
      component: makeQuiz,
      meta: { requiresAuth: true },
    },
  ],
});

// Route guard to check if the user is logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = localStorage.getItem("user");
    if (!user) {
      next("/signup");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
