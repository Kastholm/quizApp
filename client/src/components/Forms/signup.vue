<template>
  <section class="container">
    <!--     <h1>Current Users</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        email: {{ user.email }} pass: {{ user.password }}
      </li>
    </ul> -->
    <h2>Add User</h2>
    <form @submit.prevent="submitForm">
      <label>
        Email:
        <input type="email" v-model="newUserEmail" required />
      </label>
      <label for="name">Name</label>
      <input type="text" id="name" v-model="newUserName" required />
      <label>
        Password:
        <input type="password" v-model="newUserPassword" required />
      </label>
      <label>
        Confirm Password:
        <input type="password" v-model="newUserPasswordConfirm" required />
      </label>
      <button type="submit">Submit</button>
      <p v-if="message">{{ message }}</p>
      <dialog open v-if="message">
        <article>
          <header>
            <a href="#close" aria-label="Close" class="close"></a>
            Your user was added!
          </header>
          <p>
            {{ message }}
          </p>
        </article>
      </dialog>
    </form>
  </section>
</template>

<script>
// importing the composable function from the composable folder in the src folder
import userService from "../../composables/signUp.js";
// exporting the component
export default {
  data() {
    return {
      users: [],
      newUserEmail: "",
      newUserName: "",
      newUserPassword: "",
      newUserPasswordConfirm: "",
    };
  },
  // This is a lifecycle hook that is called when the component is created
  mounted() {
    userService
      .getUsers()
      .then((users) => {
        this.users = users;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  methods: {
    // If passwords dont match, alert the user
    submitForm() {
      if (this.newUserPassword !== this.newUserPasswordConfirm) {
        alert("Passwords do not match");
        return;
      }
      // If passwords match, call the insertUser function from the composable function
      userService
        .insertUser(this.newUserEmail, this.newUserName, this.newUserPassword)
        .then((response) => {
          console.log(response);
          this.newUserEmail = "";
          this.newUserName = "";
          this.newUserPassword = "";
          this.newUserPasswordConfirm = "";
          this.users.push(response.data);
          this.message = "You'll be redirected to the sign in page in a moment";
          // Redirect to the sign in page after 2 seconds
          setTimeout(() => {
            this.message = "";
            this.$router.push("/");
          }, 2000);
        })
        // If there is an error, log it to the console
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
