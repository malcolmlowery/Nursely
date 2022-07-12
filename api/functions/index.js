require('dotenv').config();
const app = require('express')();
const { admin, functions } = require('./firebase.modules');
const serviceAccount = require('../serviceAccountKey.json');

// Imported Routes
const { postsRouter } = require('./routes/posts');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

app.use(postsRouter);

exports.api = functions.https.onRequest(app);