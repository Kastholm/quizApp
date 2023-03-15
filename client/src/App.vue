<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import signin from "./components/Forms/signin.vue";
import Nav from "./components/nav.vue";
</script>

<template>
<Nav/>
  <!-- <header>Hello</header> -->
  <router-view />
  <!-- <footer>World</footer> -->
</template>

<style>
/* section{
  display: grid;
  place-content: center;
  min-height: 100vh;
} */
b {
  font-size: 2rem;
  color: green;
}
.red {
  background-color: rgba(255, 0, 0, 0.29);
  border: none;
}
.cardContainer{
      display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}
</style>
