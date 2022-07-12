require('dotenv').config();
const app = require('express')();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const functions = require("firebase-functions");
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const firestore = getFirestore();

app.get('/posts', async (req, res) => {
   await firestore
      .collection('posts')
      .get()
      .then(snapshot => {
         return res.send(snapshot.docs)
      })
      .catch(error => {
         return console.log(error)
      })
});

exports.api = functions.https.onRequest(app);