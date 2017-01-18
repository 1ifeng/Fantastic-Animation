var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
  username: {type: 'string'},
  password: {type: 'string'}
});

exports.User.index({username: 1}, {unique: true}).exec();
