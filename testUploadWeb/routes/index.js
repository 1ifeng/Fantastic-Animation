var express = require('express'),
		router = express.Router(),
		fs = require('fs'),
		formidable = require('formidable'),
		TITLE = 'formidable上传示例',
		AVATAR_UPOLOAD_FOLDER = '/avatar/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: TITLE });
});

router.post('/', function(req, res) {
	var form = new formidable.IncomingForm();

	form.encoding = 'utf8';
	form.uploadDir = 'public' + AVATAR_UPOLOAD_FOLDER;
	form.keepExtensions = true;
	form.maxFieldsSize = 2 * 1024 * 1024;

	form.parse(req, function(err, fields, files) {
		if (err) {
			res.locals.error = err;
			res.render('index', {title: TITLE});
			return;
		}

		var extName = '';
		switch (files.fulAvatar.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}

		if (extName.length === 0) {
			res.locals.error = '只支持png和jpg格式图片';
			res.render('index', {title: TITLE});
			return;
		}

		var avatarName = Math.floor(Math.random() * 100000) + '.' + extName;
		var newPath = form.uploadDir + avatarName;

		console.log(newPath);
		fs.renameSync(files.fulAvatar.path, newPath);

	});

	res.locals.success = '上传成功';
	res.render('index', {title: TITLE});

});

module.exports = router;