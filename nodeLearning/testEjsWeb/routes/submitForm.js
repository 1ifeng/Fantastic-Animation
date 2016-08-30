var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var 
	username = req.query.username,
	password = req.query.password;

	console.log('req.query用户名：' + username);
	console.log('req.query密码：' + password);

	res.render('submitForm', {title: '提交表单及接受参数'});

});

module.exports = router;

