var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {


    response.writeHead(200);

    request.pipe(response);
    // request.on('readable', function(){
    //     var chunk = null;
    //     while(null !== (chunk = request.read())) {
    //         // console.log(chunk.toString());
    //         response.write(chunk);
    //     }
    // });

    // request.on('end', function() {
    //     response.end();
    // });

    // response.write("<p>Hello, this is doggie.</p>");
    //
    // setTimeout(function() {
    //     response.write('<p>Bon, saluutjes hé</p>');
    //     response.end();
    // }, 5000);


});

server.listen(8080);
