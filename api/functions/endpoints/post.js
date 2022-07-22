const { functions, firestore, FieldValue } = require('../firebase.modules');

exports.createPost = functions.https.onRequest(async (req, res) => {
   const uid = req.body.uid;
   const description = req.body.description;
   const postId = await firestore().collection('posts').doc().id;
   const commentIdRef = await firestore().collection('comments').doc().id;
   const likesIdRef = await firestore().collection('likes').doc().id;

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
         commentIdRef,
         likesIdRef,
         description,
         numberOfComments: 0,
         numberOfLikes: 0,
         publisher: {
            uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            jobTitle: user.occupation.jobTitle
         }
      })

   await firestore()
      .collection('comments')
      .doc(commentIdRef)
      .create({ commentId: commentIdRef, postId })

   await firestore()
      .collection('likes')
      .doc(likesIdRef)
      .create({ 
         likesId: likesIdRef, 
         postIdRef: postId,
         likesByUserUid: []
      })
      
   res.send({
      postId,
      commentIdRef,
      description,
      numberOfComments: 0,
      numberOfLikes: 0,
      publisher: {
         uid,
         displayName: user.displayName,
         photoURL: user.photoURL,
         jobTitle: user.occupation.jobTitle
      }
   })
})

exports.getPost = functions.https.onRequest(async (req, res) => {
   const postId = req.body.postId;
   const commentIdRef = req.body.commentIdRef;
   
   const post = await firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(doc => doc.data())

   const comments = await firestore()
      .collection('comments')
      .doc(commentIdRef)
      .collection('responses')
      .get()
      .then(docs => {
         let comments = [];
         docs.forEach(doc => comments.push(doc.data()))
         return comments
      })

   res.send({ post, comments })
})

exports.updatePost = functions.https.onRequest(async (req, res) => {
   const postId = req.body.postId;
   const description = req.body.description;

   await firestore()
      .collection('posts')
      .doc(postId)
      .set({ description }, { merge: true })
   
   res.send({ postId, updatedText: description })
})

exports.deletePost = functions.https.onRequest(async (req, res) => {
   const postId = req.body.postId;
   const commentId = req.body.commentId;
   const likesId = req.body.likesId;

   await firestore()
      .collection('posts')
      .doc(postId)
      .delete()
   
   await firestore()
      .collection('comments')
      .doc(commentId)
      .collection('responses')
      .get()
      .then(snapshot => snapshot.docs.forEach(doc => doc.ref.delete()))

   await firestore()
      .collection('comments')
      .doc(commentId)
      .delete()

   await firestore()
      .collection('likes')
      .doc(likesId)
      .delete()


   res.send({ message: 'Post was deleted!'})
})

exports.likePost = functions.https.onRequest(async (req, res) => {
   const uid = req.body.uid
   const likesIdRef = req.body.likesIdRef
   const postId = req.body.postId

   const uidExists = await firestore()
      .collection('likes')
      .doc(likesIdRef)
      .get()
      .then((doc) => doc.data().likesByUserUid.find(id => id === uid))


   await firestore()
      .collection('posts')
      .doc(postId)
      .set({
         numberOfLikes: uidExists === undefined ? FieldValue.increment(1) : FieldValue.increment(-1)
      }, { merge: true })

   await firestore()
      .collection('likes')
      .doc(likesIdRef)
      .set({
         likesByUserUid: uidExists === undefined ? FieldValue.arrayUnion(uid) : FieldValue.arrayRemove(uid)
      }, { merge: true })

   res.send({ postId, postLiked: uidExists === undefined ? true : false })
})