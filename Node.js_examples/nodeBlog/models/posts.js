var Post = require('../lib/mongo.js').Post;

module.exports = {
  create: function create(post) {
    return Post.create(post).exec();
  }
};
