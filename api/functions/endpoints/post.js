const { functions, firestore } = require('../firebase.modules');

exports.createPost = functions.https.onRequest(async (req, res) => {
   const uid = req.body.uid;
   const description = req.body.description;
   const postId = await firestore().collection('posts').doc().id;

   const user = await firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => doc.data())

   await firestore()
      .collection('posts')
      .doc(postId)
      .create({
         postId,
         description,
         numberOfComments: 0,
         numberOfLikes: 0,
         postLiked: false,
         publisher: {
            uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            jobTitle: user.occupation.jobTitle
         }
      })
      
   res.send({
      postId,
      description,
      numberOfComments: 0,
      numberOfLikes: 0,
      postLiked: false,
      publisher: {
         uid,
         displayName: user.displayName,
         photoURL: user.photoURL,
         jobTitle: user.occupation.jobTitle
      }
   })
})

exports.updatePost = functions.https.onRequest(async (req, res) => {
   const postId = req.body.postId;
   const description = req.body.description;

   const updatedPost = await firestore()
      .collection('posts')
      .doc(postId)
      .set({ description }, { merge: true })
   
   res.send({ postId, updatedText: description })
})