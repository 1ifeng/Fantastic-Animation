/*
* nodeJS fs文件系统读取文件内容
* javascript将json字符串转换为json对象 使用eval();
 */
var readline = require('readline');
var fs = require('fs');

fs.readFile('./region.txt', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  }

  var area = eval('('+ data +')');
  var province = [];

  for (var i = 0; i < area.result.length; i++) {
    // province.push(area.result[i].localAndPriceDtoList[0]);
    for (var j = 0; j < area.result[i].localAndPriceDtoList.length; j++) {
      province.push(area.result[i].localAndPriceDtoList[j]);
    }
  }
  console.log(province);

});

// var rl = readline.createInterface(process.stdin, process.stdout);
// rl.on('line', function(line) {
//   console.log(line);
// });

// rl.on('close', function() {
//   process.exit(0);
// });
