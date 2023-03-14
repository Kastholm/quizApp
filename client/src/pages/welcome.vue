<template>
  <Nav />
  <section>
    <div class="gameStats">
      <span>
        <h1>Velkommen {{ userName }}</h1>
        <h2>Her er dine stats fra Quiz Game</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem.</p>
      </span>
      <span>
        <h2>Ønsker du at spille eller lave en ny quiz?</h2>
        <span>
          <router-link to="/makeQuiz"><button>Lav en quiz</button></router-link>
          <router-link to="/playQuiz"><button>Tag en quiz</button></router-link>
        </span>
      </span>
    </div>
  </section>
</template>

<script>
import Nav from "../components/nav.vue";
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
    } else {
      this.$router.push("/");
    }
  },
  components: {
    Nav,
  },
};
</script>

<style>
.gameStats h1 {
  background: rgb(40, 59, 40);
}
.gameStats span {
  display: block;
  width: 70%;
  margin: 0 auto;
  padding: 2em;
  text-align: center;
  background: rgb(39, 47, 69);
}
</style>
