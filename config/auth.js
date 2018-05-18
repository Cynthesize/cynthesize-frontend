// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'googleAuth' : {
        'clientID'      : '723843521187-s83osdadeo5s80qhu5prqkkajcrmcho0.apps.googleusercontent.com', // your App ID
        'clientSecret'  : 'JdElF8O1b0TuWvLpwcHuP_TJ', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    },
    'githubAuth' : {
        'clientID'      : 'ebf9889e5bc7e3e99ee2', // your App ID
        'clientSecret'  : 'c2d7ff619584497a3ca12c132813946fb2c72048', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/github/callback'
    }

};