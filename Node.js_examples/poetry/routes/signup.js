var express = require('express');
var router = express.Router();
var User = require('../model/user');


router.get('/signup', function(req, res) {
  res.render('signup', {title: '注册新用户'});
});

router.post('/signup', function(req, res) {
  var _u = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  var repassword = req.body.repassword;
  if (_u.password !== repassword) {
    req.flash('error', '两次输入密码不一致');
    return res.redirect('/signup');
  } else {
    var user = new User(_u);
    user.save(function(err) {
      if (err) console.log(err);
      console.log('user saved!');
      req.flash('success', '注册成功');
      return res.redirect('/signup');
    });
  }
});

module.exports = router;
