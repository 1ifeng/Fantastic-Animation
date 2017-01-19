var express = require('express');
var router = express.Router();

var UserModel = require('../models/user.js');
var checkNotLogin = require('../middlewares/check.js').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('login');
});

router.post('/', checkNotLogin, function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  UserModel.getUserByName(username)
    .then(function(user) {
      if (!user) {
        req.flash('error', '用户不存在');
        return res.redirect('back');
      }
      if (password !== user.password) {
        req.flash('error', '用户名或密码错误');
        return res.redirect('back');
      }

      req.flash('success', '登录成功');
      delete user.password;
      req.session.user = user;
      res.redirect('/posts');
    }).catch(next);
});

module.exports = router;
