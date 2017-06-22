'use strict'
var http = require('http')
var https = require('https')
var express = require('express')
var bodyParser = require('body-parser')
var httpProxy = require('express-http-proxy');
var proxyConfig = require('./proxy-config.json');

var apiForwardingUrl = proxyConfig.apiServer;

var PORT = process.env.PORT || 8086
var app = express()
app.use(bodyParser.json());
app.use(express.static(__dirname))
app.use('/css/libs/oj/v2.0.0/common', express.static(__dirname+'/css/libs/common'));

console.log('Forwarding API requests to ' + apiForwardingUrl);

server.all('/mobile/*', httpProxy(apiForwardingUrl, {
    forwardPath: function(req, res) {
      return require('url').parse(req.url).path;
    }
}));
app.get('/', function (req, res) {
    res.send('index.html')
});
app.listen(PORT, function () {
    console.log('listening on port ' + PORT)
});