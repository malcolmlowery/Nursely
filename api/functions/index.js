require('dotenv').config();
const app = require('express')();
const { admin, functions } = require('./firebase.modules');
const serviceAccount = require('../serviceAccountKey.json');
const rootRouter = require('./routes/index');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
app.use('/', rootRouter);

exports.api = functions.https.onRequest(app);