var mysql = require('mysql');
var DB_NAME = 'nodetest';

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'admin'
});

pool.on('connection', function(connection) {
	connection.query('SET SESSION auto_increment_increment = 1');
});

function User(user) {
	this.username = user.username;
	this.userpass = user.userpass;
}

module.exports = User;

pool.getConnection(function(err, connection) {
	var useDbsql = 'USE ' + DB_NAME;
	connection.query(useDbsql, function(err) {
		if (err) {
			console.log('USE Error:' + err.message);
			return;
		}
		console.log('USE succeed');
	});

	//保存数据
	User.prototype.save = function save(callback) {
		var user = {
			username: this.username,
			userpass: this.userpass
		};

		var insertUser_Sql = "INSERT INTO userinfo (id, username, userpass) VALUES (0, ?, ?)";

		connection.query(insertUser_Sql, [user.username, user.userpass], function(err, result) {
			if (err) {
				console.log('insertUser_Sql Error:' + err.message);
				return;
			}

			connection.release();

			console.log('invoked[save]');
			callback(err, result);
		});
	};

	//根据用户名得到用户数量
	User.getUserNumByName = function getUserNumByName (username, callback) {
		
		var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM userinfo WHERE username = ?";

		connection.query(getUserNumByName_Sql, [username], function(err, result) {
			if (err) {
				console.log('getUserNumByName_Sql Error:' + err.message);
				return;
			}

			connection.release();

			console.log('invoked[getUserNumByName]');
			callback(err, result);
		});
	};

	//根据用户名得到用户信息
	User.getUserByUsername = function getUserByUsername (username, callback) {

		var getUserByUsername_Sql = "SELECT * FROM userinfo WHERE username = ?";

		connection.query(getUserByUsername, [username], function(err, result) {
			if (err) {
				console.log('getUserByUsername Error:' + err.message);
				return;
			}

			connection.release();

			console.log('invokesd[getUserByUsername]');
			callback(err, result);
		});
	};

});
