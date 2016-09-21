// var mysql = require('mysql');

// var conn = mysql.createConnection({
//  host: 'localhost',
//  user: 'root',
//  password: 'admin',
//  database: 'nodetest'
// });

// conn.connect();

// conn.query('select 1 + 1 as solution', function (err, rows, fields) {
//  if (err) {
//    throw err;
//  }
//  console.log('the solution is: ', rows[0].solution);
// });

// conn.end();

var mysql = require('mysql');
var DB_NAME = 'nodetest';

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin'
});

pool.getConnection(function(err, connection){
  var useDbsql = 'USE ' + DB_NAME;

  connection.query(useDbsql, function(err) {
    if (err) {
      console.log('USE ERROR: ' + err.message);
      return;
    }
    console.log('USE Succeed!');
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  });

  var selectSql = 'select * from userinfo';

  connection.query(selectSql, function(err, result) {
    if (err) {
      console.log('selectSql ERROR: ' + err.message);
      return;
    }
    
    var i = 3;
    console.log(result[i]);

    connection.release();
	});

});
