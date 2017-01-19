var User = require('../lib/mongo.js').User;

module.exports = {
  create: function create(user) {
    return User.create(user).exec();
  },
  getUserByName: function getUserByName(name) {
    return User.findOne({username: name}).addCreateAt().exec();
  }
};
