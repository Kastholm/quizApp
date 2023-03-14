<template>
  <div>
    <Nav />
    <section class="container settings">
      <article>
        <h1>Hej {{ userName }}</h1>
        <h2>Her kan dine indstillinger omkring din konto ses</h2>
      </article>
      <article>
        <h2>Se dine stats:</h2>
        <h3>
          Du har pt. <b>{{ Score }}</b> points
        </h3>
      </article>
      <article>
        <form @submit.prevent="changePassword">
          <h2>Skift kodeord</h2>
          <label for="current-password">Nuværende kodeord:</label>
          <input
            type="password"
            id="current-password"
            v-model="currentPassword"
            required
          />

          <label for="new-password">Nyt kodeord:</label>
          <input
            type="password"
            id="new-password"
            v-model="newPassword"
            required
          />

          <button type="submit">Gem</button>
        </form>
      </article>
      <article>
        <h2>Ønsker du at slette din bruger?</h2>
        <button class="red" @click="deleteAccount">Slet burger</button>
      </article>
    </section>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import userService from "../composables/usersComposable.js";
import axios from "axios";

export default {
  name: "Settings",
  components: {
    Nav,
  },
  data() {
    return {
      userEmail: "",
      userName: "",
      showPasswordForm: false,
      currentPassword: "",
      newPassword: "",
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
  methods: {
    changePassword() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;

      axios
        .post(`http://localhost:3000/api/users/${userId}/changePassword`, {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        })
        .then(() => {
          alert("Your password has been changed.");
          this.currentPassword = "";
          this.newPassword = "";
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while changing your password.");
        });
    },
    deleteAccount() {
      if (confirm("Are you sure you want to delete your account?")) {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id; // Assuming the user's ID is stored as "_id" in the database

        // Make an HTTP request to delete the user's account from the server
        axios
          .delete(`http://localhost:3000/api/users/${userId}`)
          .then(() => {
            // If the deletion is successful, remove the user from localStorage
            localStorage.removeItem("user");
            this.$router.push("/");
          })
          .catch((error) => {
            console.error(error);
            alert("An error occurred while deleting your account.");
          });
      }
    },
  },
};
</script>

<style>
.settings article {
  margin: 0.5em;
  line-height: 1.2rem;
}
</style>
