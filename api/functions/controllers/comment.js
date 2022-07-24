const { firestore, admin } = require('../firebase.modules');

exports.createComment = async (req, res) => {
   const uid = res.locals.uid;
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
}

// Need to add local verification for if the res.locals.uid is
// the same as the comment uid to allow comment updates
exports.updateComment = async (req, res) => {
   const commentId = req.body.commentId;
   const responseId = req.body.responseId;
   const response = req.body.response;
 
   await firestore()
    .collection('comments')
    .doc(commentId)
    .collection('responses')
    .doc(responseId)
    .set({ response }, { merge: true })
 
    res.send({ message: 'User comment was updated!' })
 }

exports.deleteComment = async (req, res) => {
  const commentId = req.body.commentId;
  const responseId = req.body.responseId;

  await firestore()
   .collection('comments')
   .doc(commentId)
   .collection('responses')
   .doc(responseId)
   .delete()

   res.send({ message: 'User comment was deleted!'})
}