const express = require('express');
const postsRouter = express.Router();
const { firestore } = require('../firebase.modules')

postsRouter.get('/posts', async (req, res) => {
   await firestore
      .collection('posts')
      .get()
      .then(snapshot => {
         const posts = [];

         snapshot.docs.map(doc => {
            posts.push(doc.data())
         })
         res.send(posts)
      })
      .catch(error => {
         res.send(error)
      })
});

postsRouter.post('/posts', async (req, res) => {
   const uniqueID = await firestore.collection('posts').doc().id;

   await firestore
      .collection('posts')
      .doc(uniqueID)
      .create({
         "postID": uniqueID,
         "publisher": {
            "uid": "zg79b21rjbfuc9cg273h2in1br2e98h8g7",
            "profileImageURL": "https://avatars.githubusercontent.com/u/100153203?v=4",
            "firstName": "Malcolm",
            "lastName": "Lowery",
            "middleIntial": null,
            "jobTitle": "Registered Nurse"
         },
         "description": "Have you slimmed some things down because you don't have time? Is there something you always include? Something you assess that you know your colleagues do but you fee compelled to look at?",
         "numberOfComments": 1,
         "numberOfLikes": 2,
         "postLiked": false
      },)
      .then(doc => {
         res.send(doc)
      })
      .catch(error => {
         res.send(error)
      })
});

module.exports = { postsRouter };