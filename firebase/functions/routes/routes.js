module.exports = function (app) {
  app.get('/', (req, res) => {
      res.send("Hello from Firebase!"); 
  });

  app.get('/login/gmail', (req,res) => {
    res.render('google_login');
  });

  app.get('/login/github', (req,res) => {
    res.render('github_login');
  });
};