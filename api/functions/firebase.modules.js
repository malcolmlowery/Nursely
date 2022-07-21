const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');
const { firestore } = require("firebase-admin");

module.exports = {
   admin,
   functions,
   firestore,
   FieldValue,
}