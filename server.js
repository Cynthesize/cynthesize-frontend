var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport.js')(passport);
require('./config/githubPassport.js')(passport);

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

var app = express();
var port = process.env.PORT || 5000;

mongoose.connect(configDB.url, function() {
  console.log('DB is connected');
});

app.use(morgan('dev')); // Log every request to the console
app.use(cookieParser()); // Read cookies (needed for auth)
app.use(bodyParser()); // Get information from html forms

app.set('view engine', 'ejs');

// PassportJs configuration settings:

app.use(session({ secret: 'onetwothree' })); // Session Secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);
