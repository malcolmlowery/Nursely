const { admin, functions, firestore } = require('../firebase.modules');

exports.createUser = functions.https.onRequest(async (req, res) => {
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const photoURL = req.body.photoURL;
   const email = req.body.email;
   const occupation = {
      jobTitle: req.body.jobTitle,
      specializations: req.body.specializations,
      hospitalName: req.body.hospitalName
   }

   const { uid, displayName, emailVerified } = await admin.auth().createUser({
      displayName: `${firstName} ${lastName}`,
      photoURL,
      email,
      emailVerified: false,
   })
   
   await firestore()
      .collection('users')
      .doc(uid)
      .create({
         uid,
         displayName,
         photoURL,
         email,
         emailVerified,
         occupation: {...occupation},
         userPostLikes: []
      })

   res.send({
      uid,
      displayName,
      photoURL,
      email,
      emailVerified,
      occupation: { ...occupation }
   })
})

exports.updateUser = functions.https.onRequest(async (req, res) => {
   const uid = req.body.uid;
   const displayName = req.body.displayName;
   const photoURL = req.body.photoURL;
   const email = req.body.email;
   const jobTitle = req.body.jobTitle;
   const specializations = req.body.specializations;
   const hospitalName = req.body.hospitalName;

   const user = await firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => doc.data())

   const updatedUserInfo = await admin.auth().updateUser(uid, {
      displayName: displayName != undefined ? displayName : user.displayName,
      photoURL: photoURL != undefined ? photoURL : user.photoURL,
      email: email != undefined ? email : user.email
   })

   await firestore()
      .collection('users')
      .doc(uid)
      .set({
         displayName: updatedUserInfo.displayName,
         photoURL: updatedUserInfo.photoURL,
         email: updatedUserInfo.email,
         occupation: {
            jobTitle: jobTitle != undefined ? jobTitle : user.occupation.jobTitle,
            hospitalName: hospitalName != undefined  ? hospitalName : user.occupation.hospitalName,
            specializations: specializations != undefined  ? specializations : user.occupation.specializations
         }
      }, { merge: true })

   // Gets all posts in the "posts" collection for a selected user uid.
   // Then updates each document with the newly updated user info from the code above.
   await firestore()
      .collection('posts')
      .where('publisher.uid', '==', uid)
      .get()
      .then(async (snapshot) => {
         await snapshot.docs.forEach(doc => {
            doc.ref.set({
               publisher: {
                  ...doc.data().publisher,
                  displayName: updatedUserInfo.displayName,
                  photoURL: updatedUserInfo.photoURL,
                  jobTitle: jobTitle != undefined ? jobTitle : user.occupation.jobTitle,
               }
            }, { merge: true })
         })         
      })
   
   await firestore()
      .collection('comments')
      .get()
      .then(async (snapshot) => {
         await snapshot.docs.forEach(doc => {
            doc.ref.collection('responses')
               .where('uid', '==', uid)
               .get()
               .then(async (user) => {
                  await user.docs.forEach(doc => doc.ref.set({ 
                     displayName: updatedUserInfo.displayName,
                     photoURL: updatedUserInfo.photoURL,
                     jobTitle: jobTitle != undefined ? jobTitle : user.occupation.jobTitle,
                   }, { merge: true }))
               })
         })         
      })

   res.send({ message: 'User data updated in all database collection!' })
})

exports.deleteUser = functions.https.onRequest(async (req, res) => {
   const uid = req.body.uid;

   await admin.auth().deleteUser(uid)
   await firestore().collection('users').doc(uid).delete()
   await firestore()
      .collection('posts')
      .where('publisher.uid', '==', uid)
      .get()
      .then(async (snapshot) => await snapshot.docs.forEach(doc => doc.ref.delete()))

   res.send({ message: `User ${uid} was deleted`})
})