var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check.js').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
  req.session.user = null;
  req.flash('success', '登出成功');
  res.redirect('/posts');
});

module.exports = router;
