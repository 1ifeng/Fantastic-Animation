var mongoose = require('../lib/mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
}, {
  versionKey: false
});

UserSchema.virtual('userid').get(function() {
  return this._id;
});

var User = mongoose.model('user', UserSchema);

module.exports = User;
