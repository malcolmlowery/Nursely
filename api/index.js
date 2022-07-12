require('dotenv').config();
const app = require('express')();
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});

const firestore = getFirestore();

app.get('/posts', async (req, res) => {
   firestore
      .collection('posts')
      .get()
      .then(snapshot => {
         return res.send(snapshot.docs)
      })
      .catch(error => {
         return console.log(error)
      })
});

app.listen('9000', (port) => console.log(`Listening toposrt ${port}`))