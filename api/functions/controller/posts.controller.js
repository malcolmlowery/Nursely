const { firestore } = require('../firebase.modules')

// Get all user posts in posts collection
const getPosts = ('/', async (_, res) => {
   const likedPostIDs = await firestore
      .collection('likes')
      .where('userLikes', 'array-contains', 'FRbhgBU60CjtLaZ8wTox')
      .get()
      .then(snapshot => {
         const postIDs = [];
         snapshot.docs.forEach(doc => postIDs.push(doc.data().postID))
         return postIDs;
      })

   const allPosts = await firestore
      .collection('posts')
      .get()
      .then(snapshot => {
         const posts = [];
         snapshot.docs.forEach(doc => posts.push(doc.data()))
         return posts;
      })
      .catch(error => {
         res.send(error)
      })
   
   const posts = allPosts.map(post => {
      const postID = likedPostIDs.find(postID => postID == post.postID)
      if(post.postID === postID) {
         return { ...post, postLiked: true }
      }
      return post
   })
   
   res.send(posts)
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
   const userID = 'FRbhgBU60CjtLaZ8wTox';

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
      .then(async () => {

         await firestore
            .collection('likes')
            .doc(uniqueID)
            .create({
               "postID": uniqueID,
               "userLikes": []
            })
            .then(() =>  {
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
      .then(() => res.send({ postID: req.query.postID }))
      .catch(error => {
         res.send(error)
      })
})


module.exports = { 
   getPosts,
   getPost,
   createPost,
   updatePost,
   deletePost
};