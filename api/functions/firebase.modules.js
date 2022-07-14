const admin = require('firebase-admin');
const functions = require("firebase-functions");
const { Firestore, FieldValue } = require('firebase-admin/firestore');
const firestore = new Firestore();

module.exports = { admin, functions, firestore, FieldValue }