var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: '加密字符串示例' });
});

module.exports = router;
