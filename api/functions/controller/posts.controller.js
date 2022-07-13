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
const createPost = ('/', async (req, res) => {
   const uniqueID = await firestore.collection('posts').doc().id;
   const userID = 'erHY5idyBp9CqwgGPzDD';

   const user = await firestore
      .collection('users')
      .doc(userID)
      .get()
      .then((snapshot) => {
         const user = snapshot.data();
         return {
            uid: userID,
            firstName: user.firstName,
            lastName: user.lastName,
            middleInital: user.middleInital,
            profileImageURL: user.profilePhotoURL,
            jobTitle: user.Occupation.jobTitle
         }
      })
      
   await firestore
      .collection('posts')
      .doc(uniqueID)
      .create({
         "postID": uniqueID,
         "publisher": {...user},
         "description": req.body.description,
         "numberOfComments": 0,
         "numberOfLikes": 0,
         "postLiked": false
      })
      .then(() => {
         res.send({
            "postID": uniqueID,
            "publisher": {...user},
            "description": req.body.description,
            "numberOfComments": 0,
            "numberOfLikes": 0,
            "postLiked": false
         })
      })
      .catch(error => {
         res.send(error)
      })
});

const updatePost = ('/post', async (req, res) => {
   await firestore
      .collection('posts')
      .doc(req.query.postID)
      .set({ description: req.body.description }, { merge: true })
      .then(() => {
         res.send({ description: req.body.description, postID: req.query.postID})
      })
      .catch(error => {
         res.send(error)
      })
});

const deletePost = ('/post', async (req, res) => {
   await firestore
      .collection('posts')
      .doc(req.query.postID)
      .delete()
      .then(() => res.send({ "message": "Post was deleted"}))
})

module.exports = { 
   getPosts,
   getPost,
   createPost,
   updatePost,
   deletePost,
};