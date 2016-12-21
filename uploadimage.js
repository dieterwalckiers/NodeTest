var fs = require('fs');
var http = require('http');

var server = http.createServer();

server.on('request', function(request,response){
  var newFile = fs.createWriteStream("readme_copy.md");
  request.pipe(newFile);
  request.on('end', function(){response.end('uploaded!')});
});

server.listen(8080);
