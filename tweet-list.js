var express = require('express');
var request = require('request');
var url = require('url');

var app = express();

app.get('/tweets/:username', function(req, response) {
    var username = req.params.username;

    options = {
        protocol: "https",
        host: "jsonplaceholder.typicode.com",
        pathname: "/posts"
    }

    var twitterUrl = url.format(options);

    request(twitterUrl, function(err, res, body) {
        var tweets = JSON.parse(body);
        response.locals = {tweets: tweets, name: username};
        response.render('tweets.ejs');
    });

});

app.listen(8080);
