const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

var app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.send("Hello from Firebase!"); 
});

app.get('/login/gmail', (req,res) => {
res.render('google_login');
});

app.get('/login/github', (req,res) => {
res.render('github_login');
});

var routes = require('./routes/routes');

exports.app = functions.https.onRequest(app);
