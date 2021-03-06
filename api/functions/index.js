const cors = require('cors')
const { admin, functions } = require('./firebase.modules');
const express = require('express');
const app = express();
const rootRouter = require('./routes/index');
const serviceAccount = require('./fb-certs.json');

app.use(cors({ origin: true }))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
app.use('/', rootRouter)

exports.api = functions.https.onRequest(app);