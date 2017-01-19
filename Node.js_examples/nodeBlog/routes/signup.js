var express = require('express');
var router = express.Router();

var UserModel = require('../models/user.js');
var checkNotLogin = require('../middlewares/check.js').checkNotLogin;

router.get('/',checkNotLogin, function(req, res, next) {
  // res.send(req.flash());
  res.render('signup');
});

router.post('/', checkNotLogin, function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;

  try {
    if (!(username.length >= 1 && username.length <= 10)) {
      throw new Error('名字长度在1~10个字符之间');
    }
    if (repassword != password) {
      throw new Error('两次密码不一致');
    }
  } catch(e) {
    req.flash('error', e.message);
    console.log(e.message);
    return res.redirect('/signup');
  }

  var user = {
    username: username,
    password: password
  };

  UserModel.create(user).then(function(result) {
    user = result.ops[0];
    delete user.password;
    req.session.user = user;
    req.flash('success', '注册成功');
    console.log('============\n Signup OK!  \n ============');
    res.redirect('/posts');
  }).catch(function(e) {
    if (e.message.match('E11000 duplicate key')) {
      console.log(e.message);
      req.flash('error', '用户名已经被占用');
      return res.redirect('/signup');
    }
    next(e);
  });
});

module.exports = router;



// https://github.com/nswbmw/N-blog
