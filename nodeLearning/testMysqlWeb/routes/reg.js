var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_REG = '注册';

router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
	var userName = req.body.txtUserName,
			userPwd = req.body.txtUserPwd,
			userRePwd = req.body.txtUserRePwd,
			md5 = crypto.createHash('md5');

			userPwd = md5.update(userPwd ).digest('hex');

	var newUser = new User({
		username: userName,
		userpass: userPwd
	});

	User.getUserNumByName(newUser.username, function(err, results) {
		if (results !== null && results[0]['num'] > 0) {
			err = '用户已经存在';
		}

		if (err) {
			res.locals.error = err;
			res.render('reg', {title: TITLE_REG});
			return;
		}

		newUser.save(function(err, result) {
			if (err) {
				res.locals.error = err;
				res.render('reg', {title: TITLE_REG});
				return;
			}

			if (result.insertId > 0) {
				res.locals.success = '注册成功，请点击 <a class="btn btn-link" href="/login" type="button">登录</a>';
			} else {
				res.locals.error = err;
			}

			res.render('reg', {title: TITLE_REG});
		});

	});
});

module.exports = router;