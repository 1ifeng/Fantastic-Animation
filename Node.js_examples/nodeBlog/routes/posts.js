var express = require('express');
var router = express.Router();

var PostModel = require('../models/posts.js');
var checkLogin = require('../middlewares/check.js').checkLogin;

router.get('/', function(req, res, next) {
  res.render('posts');
});

router.get('/create', checkLogin, function(req, res, next) {
  res.render('create');
});

router.post('/', checkLogin, function(req, res, next) {
  // res.render('posts');
  var author = req.session.user._id;
  var title = req.body.title;
  var content = req.body.content;
  console.log('===============\n' +　author);

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
      console.log('post OK!!!!!!!!!!!!!!!!!!!!!!');
      req.flash('success', '发表成功');
      res.redirect('/posts/${posts._id}');
    }).catch(next);
});


router.get('/:postId', function(req, res, next) {
  res.send(req.flash());
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



