var express = require("express");
var app = express();
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
var redis = require("redis");

var redisClient = redis.createClient();

var server = require("http").createServer(app);

var io = require("socket.io")(server);

var messages = [];

var storeMessage = function(name, data) {

    var message = JSON.stringify({
        name: name,
        data: data
    });

    redisClient.lpush("messages", message, function(err, response) {
        redisClient.ltrim("messages", 0, 9);
    });

    messages.push({
        name: name,
        data: data
    });
    if (messages.length > 10) {
        messages.shift();
    }
};

io.on("connection", function(client) {
    console.log("client connected...");

    client.on("join", function(name) {
        client.nickname = name;
        console.log("Enter " + name);

        client.broadcast.emit("add chatter", name);

        redisClient.sadd("chatters", name);

        redisClient.smembers("chatters", function(err, names) {
            names.forEach(function(name) {
                client.emit("add chatter", name);
            });
        });


        redisClient.lrange("messages", 0, -1, function(err, messages) {
            messages.reverse();
            messages.forEach(function(msg) {
                msg = JSON.parse(msg);
                client.emit("messages", msg.name + ": " + msg.data);
            });
        });

    });

    client.on("messages", function(data) {
        var nickname = client.nickname;
        console.log(nickname + ": " + data);
        client.broadcast.emit("messages", nickname + ": " + data);
        client.emit("messages", "You: " + data);
        storeMessage(nickname, data);
    });

    client.on("disconnect", function(name) {
        client.broadcast.emit("remove chatter", client.nickname);
        redisClient.srem("chatters", client.nickname);

    });
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080);
