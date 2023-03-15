<template>
  <div>
    <section class="container settings">
      <article>
        <!-- Change password form -->
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
        <!-- Delete account section -->
        <h2>Ønsker du at slette din bruger?</h2>
        <button class="red" @click="deleteAccount">Slet burger</button>
      </article>
    </section>
  </div>
</template>

<script>
// Import required dependencies and services
import userService from "../composables/usersComposable.js";
import axios from "axios";

export default {
  name: "Settings",
  // Component's data properties
  data() {
    return {
      userEmail: "",
      userName: "",
      showPasswordForm: false, // A flag to control whether to show the password form
      currentPassword: "", // Model for the current password input
      newPassword: "", // Model for the new password input
    };
  },
  created() {
    // Get user information from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userName = user.name;
      this.Score = user.score;
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    // Method to change the user's password
    changePassword() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;

      // Send a request to the server to change the user's password
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
    // Method to delete the user's account
    deleteAccount() {
      if (confirm("Are you sure you want to delete your account?")) {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;

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
/* Styling for the settings sections */
.settings article {
  margin: 0.5em;
  line-height: 1.2rem;
}
</style>
