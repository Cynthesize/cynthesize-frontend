var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var projectsSchema = mongoose.Schema({
  project_title: String,
  project_owner: String,
  description: String,
  pictures: { data: Buffer, contentType: String },
  videos: { data: Buffer, contentType: String },
  tags: String,
  comments: Object,
  upvotes: Number,
  downvotes: Number
});

projectsSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

projectsSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('projects', projectsSchema);
