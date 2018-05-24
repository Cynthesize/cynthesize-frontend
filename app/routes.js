module.exports = function(app, passport) {
  var bodyParser = require('body-parser');
  var project = require('./models/project');
  var mongoClient = require('mongodb').MongoClient;
  var url = require('../config/database').url;
  var ObjectId = require('mongodb').ObjectID;
  var urlencodedParser = bodyParser.urlencoded({extended: true});

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  app.get('/auth/github', passport.authenticate('github', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user, // get the user out of session and pass to template
      location : function() {
        if (req.user.location)
          return req.user.location;
        else
          return "-";
      }
      organization : function() {
        if (req.user.organization)
          return req.user.organization;
        else
          return "-";
      }
    });
  });

  app.post('/profile', isLoggedIn, urlencodedParser, function (req, res) {
    var responseMessage = [];
    console.log(req.user._id);
    console.log('Connection to database established');
    mongoClient.connect(url, function(err, database) {
      if (err) {
        console.log('Couldn\'t connect to database');
      }
      
      database.collection('users').updateOne({_id:req.user._id}, {$set: {location:req.body.location,organization:req.body.organization}});
    });
    res.render('profile.ejs', {
      user : req.user, // get the user out of session and pass to template
      location : function() {
        if (req.user.location)
          return req.user.location;
        else
          return "-";
      }
      organization : function() {
        if (req.user.organization)
          return req.user.organization;
        else
          return "-";
      }
    });
  });

  app.get('/add-project', isLoggedIn, function (req, res) {
    res.render('add-project.ejs');
  });

  app.post('/add-project', isLoggedIn, urlencodedParser, function (req, res) {
    var responseMessage = [];
    var projectDetails = {
      project_title: req.body.form_data.project_title,
      project_owner: req.user._id,
      description: req.body.form_data.description,
      pictures: req.body.form_data.pictures,
      videos: req.body.form_data.videos,
      tags: req.body.form_data.tags,
      comments: {},
      upvotes: 0,
      downvotes: 0
    };
    mongoClient.connect(url, function(err, database) {
      if (err) {
        console.log('Couldn\'t connect to database');
      }
      console.log('Connection to database established');
      database.collection('projects').insertOne(projectDetails, function(err){
        if (err) {
          console.log('There was error in inserting project.');
        }
        console.log('Successfully entered');
        responseMessage = 'Congratulations! Project submitted.';
      });
    });
    res.json(responseMessage);
  });
};

// route middleware to make sure a user is logged in
var isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
