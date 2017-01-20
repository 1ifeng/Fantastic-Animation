var express = require('express');
var router = express.Router();

var PostModel = require('../models/posts.js');
var checkLogin = require('../middlewares/check.js').checkLogin;

// GET /posts
router.get('/', function(req, res, next) {
  console.log('++++++++++++++++++++++++++++++');
  var author = req.query.author;
  console.log(author);

  PostModel.getPosts(author)
    .then(function(posts) {
      res.render('posts', {posts: posts});
    }).catch(next);
});

// GET /create
router.get('/create', checkLogin, function(req, res, next) {
  res.render('create');
});

// POST /posts
router.post('/', checkLogin, function(req, res, next) {
  var author = req.session.user._id;
  var title = req.body.title;
  var content = req.body.content;

  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }
    if (!content.length) {
      throw new Error('请填写内容');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  var post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  };
  PostModel.create(post)
    .then(function(result) {
      post = result.ops[0];
      req.flash('success', '发表成功');
      res.redirect(`/posts/${post._id}`);
    }).catch(next);
});

// GET /posts/:postId
router.get('/:postId', function(req, res, next) {
  var postId = req.params.postId;

  Promise.all([
    PostModel.getPostById(postId),
    PostModel.incPv(postId)
  ]).then(function(result) {
    var post = result[0];
    if (! post) {
      throw new Error('文章不存在');
    }
    res.render('post', {post: post});
  }).catch(next);
});

router.get('/:postId/edit', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

router.post('/:postId/edit', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

router.get('/:postId/remove', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

router.post('/:postId/comment', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
