var config = require('config-lite');
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

mongolass.plugin('addCreateAt',{
  afterFind: function(results) {
    result.forEach(function(item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function(result) {
    if (result) {
      result.create_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});

exports.User = mongolass.model('User', {
  username: {type: 'string'},
  password: {type: 'string'}
});

exports.Post = mongolass.model('Post', {
  abthor: {type: Mongolass.Types.ObjectId},
  title: {type: 'string'},
  content: {type: 'string'},
  pv: {type: 'number'}
});

exports.User.index({username: 1}, {unique: true}).exec();
exports.Post.index({author: 1, _id: -1}).exec();
