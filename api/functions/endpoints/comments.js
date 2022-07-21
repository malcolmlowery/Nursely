const { functions, firestore } = require('../firebase.modules');

exports.createCommentOnPost = functions.https.onRequest(async (req, res) => {
   const uid = req.body.uid;
   const commentIdRef = req.body.commentIdRef;
   const response = req.body.response;

   const user = await firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((doc) => doc.data())

   const commentResponseId = await firestore()
      .collection('comments')
      .doc(commentIdRef)
      .collection('responses')
      .doc().id;
      
   await firestore()
      .collection('comments')
      .doc(commentIdRef)
      .collection('responses')
      .doc(commentResponseId)
      .create({
         uid,
         responseId: commentResponseId,
         displayName: user.displayName,
         jobTitle: user.occupation.jobTitle,
         photoURL: user.photoURL,
         response,
      })

   res.send({
      uid,
      responseId: commentResponseId,
      displayName: user.displayName,
      jobTitle: user.occupation.jobTitle,
      photoURL: user.photoURL,
      response,
   })
})