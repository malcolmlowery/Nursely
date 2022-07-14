const { firestore, FieldValue } = require('../firebase.modules')

const likePost = ('/', async (req, res) => {
   const uid = req.body.uid;
   
   const uidList = await firestore
      .collection('likes')
      .doc(req.query.postID)
      .get()
      .then((snapshot) => {
         return snapshot.data().userLikes;
      })

   const uidExists = uidList.find(userID => userID === uid)

   if(uidExists !== undefined) {
      await firestore
         .collection('likes')
         .doc(req.query.postID)
         .set({
            userLikes: FieldValue.arrayRemove('FRbhgBU60CjtLaZ8wTox')
         }, { merge: true })
       
      await firestore
         .collection('posts')
         .doc(req.query.postID)
         .set({
            numberOfLikes: FieldValue.increment(-1)
         }, { merge: true })
         
      return res.send({ postLiked: false, postID: req.query.postID })
   }
   if(uidExists === undefined) {
      await firestore
         .collection('likes')
         .doc(req.query.postID)
         .set({
            userLikes: FieldValue.arrayUnion('FRbhgBU60CjtLaZ8wTox')
         }, { merge: true })

      await firestore
         .collection('posts')
         .doc(req.query.postID)
         .set({
            numberOfLikes: FieldValue.increment(1)
         }, { merge: true })

      return res.send({ postLiked: true, postID: req.query.postID})
   }
});

module.exports = { likePost }