var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var projectsSchema = mongoose.Schema({
  project_owner: String,
  description: String,
  pictures: File,
  videos: File,
  tags: String,
  comments: Object
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('projects', projectsSchema);
