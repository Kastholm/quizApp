<template>
  <nav>
    <ul>
      <li><strong>Quiz App</strong></li>
    </ul>
    <ul>
      <li><router-link to="/welcome">Hjem</router-link></li>
      <li><router-link to="/playQuiz">Quiz Game</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
      <li><button @click="signOut">Sign Out</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  methods: {
    // signOut method that removes the user from the local storage and redirects to the home page
    signOut() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style>
nav ul {
  padding: 0 4em;
}
</style>
