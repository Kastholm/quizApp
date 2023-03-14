require('dotenv').config()
const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

//Connection to MongoDB Database
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
  })

  return client.db('quiz-app-database').collection('posts')
}

//Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection()
  res.send(await posts.find({}).toArray())
})

//Add Post
router.post('/', async (req, res) => {
  //post request to add a post
  const posts = await loadPostsCollection() //load the posts collection
  await posts.insertOne({
    //insert a new post into the collection
    text: req.body.text, //text is the name of the input field in the form
    createdAt: new Date()
  })
  res.status(201).send() //send a 201 status code to the client
})

//Delete Post
router.delete('/:id', async (req, res) => {
  //:id is a parameter
  const posts = await loadPostsCollection() //load the posts collection
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) }) //delete the post with the id that matches the id in the url
  res.status(200).send() //send a 200 status code to the client
})

module.exports = router
