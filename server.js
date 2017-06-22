'use strict'
var http = require('http')
var https = require('https')
var express = require('express')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 8085
var app = express()
app.use(bodyParser.json());
app.use(express.static(__dirname))
app.get('/', function (req, res) {
    res.send('index.html')
});
app.listen(PORT, function () {
    console.log('listening on port ' + PORT)
});