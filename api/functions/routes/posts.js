const express = require('express');
const postsRouter = express.Router();
const { firestore } = require('../firebase.modules')

// Middleware for authentication still needs to be added
// Get every user posts for the client Newsfeed screen
postsRouter.get('/posts', async (_, res) => {
   await firestore
      .collection('posts')
      .get()
      .then(snapshot => {
         const posts = [];

         snapshot.docs.forEach(doc => {
            posts.push(doc.data())
         })
         res.send(posts)
      })
      .catch(error => {
         res.send(error)
      })
});

// Creates user posts
postsRouter.post('/posts', async (_, res) => {
   const uniqueID = await firestore.collection('posts').doc().id;

   await firestore
      .collection('posts')
      .doc(uniqueID)
      .create({
         "postID": uniqueID,
         "publisher": {
            "uid": "Ym6B4zH0Xn4Mk0sHZKMF",
            "profileImageURL": "https://avatars.githubusercontent.com/u/100153203?v=4",
            "firstName": "Malcolm",
            "lastName": "Lowery",
            "middleIntial": null,
            "jobTitle": "Registered Nurse"
         },
         "description": "TEST",
         "numberOfComments": 0,
         "numberOfLikes": 0,
         "postLiked": false
      })
      .then(doc => {
         res.send(doc)
      })
      .catch(error => {
         res.send(error)
      })
});

module.exports = { postsRouter };