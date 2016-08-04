var express = require('express');
var app = express();
var args = require('minimist')(process.argv.slice(2));
console.log(args);
var host = args['host'] || 'localhost';
var port = args['port'] || '8080';

app.use(express.static(__dirname));

app.listen(port, host, function () {
  console.log(['Example app listening on ', host, ':', port, '!'].join(''));
});
