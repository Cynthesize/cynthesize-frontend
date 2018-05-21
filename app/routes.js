module.exports = function(app, passport) {
  var bodyParser = require('body-parser');
  var project = require('./models/project');

  var urlencodedParser = bodyParser.urlencoded({extended:false});

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
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

  app.get('/add-project', isLoggedIn, function (req, res) {
    res.render('add-project.ejs');
  });

  app.post('/add-project', isLoggedIn, urlencodedParser, function (req, res) {
    var projectDetails = {
      project_owner: req.user._id,
      description: req.body.form_data.description,
      pictures: req.body.form_data.pictures,
      videos: req.body.form_data.videos,
      tags: req.body.form_data.tags,
      comments: {}
    };
    console.log(projectDetails);
  });
};

// route middleware to make sure a user is logged in
var isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
