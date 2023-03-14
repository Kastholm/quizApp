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
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$router.push({
        path: "/welcome",
      });
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  methods: {
    // signIn method that calls the getUsers function from the composable function
    signIn() {
      userService
        // getUsers function returns a promise
        .getUsers()
        // then method is called when the promise is resolved
        .then((users) => {
          const user = users.find(
            (u) => u.email === this.email && u.password === this.password
          );
          // if user is found, store the user in local storage and redirect to welcome page
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.$router.push({
              path: "/welcome",
            });
            // if user is not found, show an alert
          } else {
            alert("Incorrect email or password");
          }
        })
        // catch method is called when the promise is rejected
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
