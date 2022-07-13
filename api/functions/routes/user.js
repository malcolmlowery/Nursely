const express = require('express');
const userRouter = express.Router();
const { firestore } = require('../firebase.modules')

// Create a new user
const createUser = userRouter.post('/users/user', async (req, res) => {
   const uniqueID = await firestore.collection('users').doc().id;
   
   await firestore
      .collection('users')
      .doc(uniqueID)
      .create({
         "uid": uniqueID,
         "firstName": "Malcolm",
         "lastName": "Lowery",
         "middleInital": null,
         "profilePhotoURL": "https://avatars.githubusercontent.com/u/100153203?v=4",
         "userLocation": {
            "city": "Lighthouse Point",
            "state": "FL"
         },
         "Occupation": {
            "jobTitle": "Registered Nurse",
            "departments": ["ICU", "Neurology", "Gynecology"],
            "jobLocation": "Delray Medical Center"
         },
         "bannerImageURL": "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/10/1005/Hyatt-Centric-Las-Olas-Fort-Lauderdale-P038-Dusk-Hotel.jpg/Hyatt-Centric-Las-Olas-Fort-Lauderdale-P038-Dusk-Hotel.16x9.jpg?imwidth=1920"
      })
      .then(doc => {
         res.send(doc)
      })
      .catch(error => {
         res.send(error)
      })
});

// Gets a specific user and their posts
const getUser = userRouter.get('/users/user', async (req, res) => {
   let userInfo;
   const userPosts = [];

   await firestore
      .collection('users')
      .doc(req.query.uid)
      .get()
      .then(snaphot => userInfo = snaphot.data())
      .catch(error => res.send(error))

     await firestore
      .collection('posts')
      .where('publisher.uid', '==', req.query.uid)
      .get()
      .then(snapshot => snapshot.docs.forEach(doc => userPosts.push(doc.data())))
      .catch(error => res.send(error))

      res.send({
         "userInfo": userInfo,
         "posts": userPosts
      })
});

const getAllUsers = userRouter.get('/users', async (req, res) => {
   await firestore
      .collection('users')
      .get()
      .then(({ docs }) => {
         const users = [];
         docs.forEach(doc => {
            users.push(doc.data())
         })
         res.send(users)
      })
      .catch(error => res.send(error))
});

module.exports = { createUser, getUser, getAllUsers }