var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: '提交表单及接受参数示例' });
});

module.exports = router;
