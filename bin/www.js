#!/usr/bin/env node
'use strict';

// module dependencies
var server = require('../dist/server');
/* This is requiring in the compiled .ts server file that
*  currently sits in src but will be transpiled into the dist directory
*/
var debug = require('debug')('express:server');
var http = require('http');

// Create the http server
var httpPort = normalizePort(process.env.PORT || 8080);
// This is calling the exported server file, calling the server class, and then calling the public bootstrap function which returns the server class
var app = server.Server.bootstrap().app;
// If app = the returned server, where does set come from?
app.set('port', httpPort);
var httpServer = http.createServer(app);

// listen on provided ports
httpServer.listen(httpPort);

// add error handler
httpServer.on('error', onError);

// start listening on port
httpServer.on('listening', onListening);

// normalize port into a nunber string or false
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle errors with specific messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privleges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// event listener for http server 'listening' event.
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
