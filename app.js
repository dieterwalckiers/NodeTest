// var hello = require('./custom_hello');
// var gb = require('./custom_goodbye');
// var myMod = require('./my_module.js');
//
// hello();
// gb.goodbye();
//
// require('./custom_goodbye').goodbye();
//
// myMod.foo();
// myMod.bar();

var http = require('http');

var message = "Here's looking at you, kid";
var options = {
    host: 'localhost',
    port: 8080,
    path: '/',
    method: 'POST'

};

var request = http.request(options, function(response) {
    response.on('data', function(data) {
        console.log(data);
    });
});

request.write(message);
request.end();
