<template>
  <section>
    <main class="container">
      <article>
        <span>
          <!-- Display a welcome message with the user's name -->
          <h1>Velkommen {{ userName }}</h1>
        </span>
        <span>
          <!-- Display options for the user to create or play a quiz -->
          <h2>Ønsker du at spille eller lave en ny quiz?</h2>
          <span>
            <router-link to="/makeQuiz"
              ><button>Lav en quiz</button></router-link
            >
            <router-link to="/playQuiz"
              ><button>Tag en quiz</button></router-link
            >
          </span>
        </span>
        <span>
          <!-- Display an option for the user to view their play history -->
          <h2>Du kan også tilse din spillehistorik her:</h2>
          <span>
            <router-link to="/history"><button>Historik</button></router-link>
          </span>
        </span>
      </article>
    </main>
  </section>
</template>
<script>
export default {
  name: "Welcome",
  // Define the component's props
  props: {
    user: Object,
  },
  // Component's data properties
  data() {
    return {
      userName: "",
    };
  },
  // Component's lifecycle hook to set up data when the component is created
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userName = user.name;
      this.Score = user.score;
    } else {
      // If no user is found in localStorage, redirect to the home page
      this.$router.push("/");
    }
  },
};
</script>
<style></style>
