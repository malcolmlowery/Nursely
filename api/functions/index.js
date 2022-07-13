require('dotenv').config();
const app = require('express')();
const { admin, functions } = require('./firebase.modules');
const serviceAccount = require('../serviceAccountKey.json');

// Imported Routes
const { postsRouter } = require('./routes/posts');
const { userRouter, getUser, getAllUsers, createUser } = require('./routes/user');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

app.use(postsRouter);
app.use('/', createUser)
app.use('/', getAllUsers)
app.use('/:uid', getUser)

exports.api = functions.https.onRequest(app);