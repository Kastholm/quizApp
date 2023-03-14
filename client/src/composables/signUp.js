/* -------------------------------------------------------------------------- */
/*                          Connection to the server                          */
/* -------------------------------------------------------------------------- */
// Connects to the server and sends the data from the form to the server
import axios from "axios";
const url = "http://localhost:3000/api/users";

/* -------------------------------------------------------------------------- */
/*                        Collecting data from the form                       */
/* -------------------------------------------------------------------------- */
// Collects the data from the form and sends it to the server
class userService {
  // Get Posts
  static getUsers() {
    // Returning a promise so that the data can be used in other files
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          // If promise is resolved, return the data from the server
          data.map((user) => ({
            ...user,
            createdAt: new Date(user.createdAt),
          }))
        );
        // If promise is rejected, return the error
      } catch (err) {
        reject(err);
      }
    });
  }
  // Create Post
  static insertUser(email, name, password) {
    return axios.post(url, {
      email: email,
      name: name,
      password: password,
      createdAt: new Date(),
    });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}/${id}`);
  }
}
/* -------------------------------------------------------------------------- */
/*            Exporting the class so it can be used in other files            */
/* -------------------------------------------------------------------------- */
export default userService;
