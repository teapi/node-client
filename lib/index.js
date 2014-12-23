'use strict'
var Client = require('./client');

module.exports = function(host, key, secret) {
  return new Client(host, key, secret);
};
