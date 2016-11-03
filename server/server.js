//=============================================================
// Magnus Persson 2016
//=============================================================
var name = "GruntBase";
var express = require('express');
var app = express(app);
var server = require('http').createServer(app);
var logger = require('util');
var port = 8000;
var version = 0.1;

var timesyncServer = require('timesync/server');
app.use(express.static("../"));
app.use('/timesync', timesyncServer.requestHandler);
var clients = {};


var Eureca = require('eureca.io');
var eurecaServer = new Eureca.Server(
    {allow:
        [
        ]
    });
eurecaServer.attach(server);

logger.log("====================================");
logger.log(name);
logger.log("====================================");
logger.log(" Server version",version);
logger.log("====================================");
logger.log("Started server on port "+port);


//detect client connection
eurecaServer.onConnect(function (conn) {    
    logger.log('New Client: id=%s ', conn.id, conn.remoteAddress);
});

//detect client disconnection
eurecaServer.onDisconnect(function (conn) {    
    logger.log('Client disconnected:', conn.id);
});

server.listen(port);
