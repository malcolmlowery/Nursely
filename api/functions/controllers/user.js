const { admin, firestore } = require('../firebase.modules');

exports.createUser = async (req, res) => {
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const photoURL = req.body.photoURL;
   const password = req.body.password;
   const email = req.body.email;
   const occupation = {
      jobTitle: req.body.jobTitle,
      specializations: req.body.specializations,
      hospitalName: req.body.hospitalName
   }

   console.log(email)

   const { uid, displayName, emailVerified } = await admin.auth().createUser({
      displayName: `${firstName} ${lastName}`,
      photoURL,
      password,
      email,
      emailVerified: false,
   })

   const token = await admin.auth().createCustomToken(uid)
   
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
      token,
      displayName,
      photoURL,
      occupation: { ...occupation }
   })
}

exports.updateUser = async (req, res) => {
   const uid = res.locals.uid;
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
}

exports.deleteUser = async (req, res) => {
   const uid = res.locals.uid;

   await admin.auth().deleteUser(uid)
   await firestore().collection('users').doc(uid).delete()
   await firestore()
      .collection('posts')
      .where('publisher.uid', '==', uid)
      .get()
      .then(async (snapshot) => await snapshot.docs.forEach(doc => doc.ref.delete()))

   res.send({ message: `User ${uid} was deleted`})
}