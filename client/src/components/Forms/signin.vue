<template>
  <section class="container">
    <h1>Velkomen, log ind eller opret bruger</h1>
    <form @submit.prevent="signIn">
      <!-- Markup example 1: input is inside label -->
      <label for="email">
        E-mail
        <input
          type="text"
          id="email"
          name="email"
          placeholder="E-mail"
          v-model="email"
          required
        />
      </label>

      <label for="password">
        Kode
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Kode"
          v-model="password"
          required
        />
      </label>
      <!-- Button -->
      <button type="submit">Log ind</button>
    </form>
    <h2>Opret ny bruger her</h2>
    <router-link to="/signup"
      ><button type="submit">Opret bruger</button>
    </router-link>
  </section>
</template>

<script>
// importing the composable function from the composable folder in the src folder
import userService from "../../composables/usersComposable.js";

export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
    };
  },
  // This is a lifecycle hook that is called when the component is created
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push({
        path: "/welcome",
      });
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  methods: {
    signIn() {
      userService
        .signInUser(this.email, this.password)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);

            // Navigate to the welcome page
            if (this.$route.path !== "/welcome") {
              this.$router.push({
                path: "/welcome",
              });
            }
          } else {
            alert("Incorrect email or password");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
