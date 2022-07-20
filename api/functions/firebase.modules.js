const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");

module.exports = {
   admin,
   functions,
   firestore
}