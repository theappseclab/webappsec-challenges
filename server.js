#!/usr/bin/env node

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var debug = require('debug')('webapp');
var app = require('./app');

app.set('port', port);
app.set('ipaddress', ipaddress)

var server = app.listen(app.get('port'), app.get('ipaddress'), function() {
  console.log('WebAppSec Challenges - Server listening on port ' + server.address().port);
});
