var fs = require('fs'),
    process = require('process'),
    stdout = process.stdout,
    stdin = process.stdin;

function file(i) {
  var filename = files[i];
  fs.stat(__dirname + '/' + filename, function(err, stat) {
    if(stat.isDirectory()) {
      console.log('  ' + i + '  \033[36m' + filename + '/\033[39m');
    } else {
      console.log('  ' + i + '  \033[90m' + filename + '/\033[39m');
    }

    if(++i == files.length) {
      read();
    } else {
      file(i);
    }
  });
}

function read() {
  console.log('');
  stdout.write('  \033[33mEnter your choice: \033[39m');
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', option);
}

function option(data) {
  if(!files[Number(data)]) {
    stdout.write('  \033[33mEnter your choice: \033[39m');
  } else {
    stdin.pause();
    fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
      console.log('');
      console.log('\033[90m' + data.replace(/(.*)/g, '  $1') + '\033[39m');
    });
  }
}
