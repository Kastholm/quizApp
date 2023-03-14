//Forbinder til axios og sender http requests til serveren
import axios from "axios";
const url = "http://localhost:3000/api/posts";

// Henter alle posts fra serveren og returnerer dem
class PostService {
  // Get Posts
  static getPosts() {
    // Returnerer en promise som kan håndteres i komponenten der bruger denne klasse
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          // Hvis promise bliver resolved, så returneres data
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  // Create Post
  static insertPost(text) {
    return axios.post(url, {
      text,
      createdAt: new Date(),
    });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}/${id}`);
  }
}

export default PostService;
