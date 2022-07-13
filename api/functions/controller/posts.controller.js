const { firestore } = require('../firebase.modules')

// Get all user posts in posts collection
const getPosts = ('/', async (_, res) => {
   await firestore
      .collection('posts')
      .get()
      .then(snapshot => {
         const posts = [];
         snapshot.docs.forEach(doc => posts.push(doc.data()))
         res.send(posts)
      })
      .catch(error => {
         res.send(error)
      })
});

// Get a single post along with its user comments
const getPost = ('/post', async (req, res) => {
   let postData;

   await firestore
      .collection('posts')
      .doc(req.query.postID)
      .get()
      .then(snapshot => {
         postData = snapshot.data()
      })
      .catch(error => {
         res.send(error)
      })

     res.send({ "post": postData }) 
});

// Creates user posts
const createPost = ('/', async (_, res) => {
   const uniqueID = await firestore.collection('posts').doc().id;

   await firestore
      .collection('posts')
      .doc(uniqueID)
      .create({
         "postID": uniqueID,
         "publisher": {
            "uid": "SR5cmJ0K0UsSWrdfCqxK",
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

module.exports = { 
   getPosts,
   getPost,
   createPost
};