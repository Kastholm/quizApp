<template>
  <section>
    <main class="container">
      <article>
          <span>
            <h1>Velkommen {{ userName }}</h1>
          </span>
          <span>
            <h2>Ønsker du at spille eller lave en ny quiz?</h2>
            <span>
              <router-link to="/makeQuiz"><button>Lav en quiz</button></router-link>
              <router-link to="/playQuiz"><button>Tag en quiz</button></router-link>
            </span>
          </span>
          <span>
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
  props: {
    user: Object,
  },
  data() {
    return {
      userName: "",
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
};
</script>

<style>


</style>
