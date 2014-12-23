var crypto = require('crypto');
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));

var version = "/v1";

function Client(host, key, secret) {
  if (host.length < 8) {
    throw 'invalid host value'
  }
  if (!/https?:\/\//.test(host)) {
    host = "https://" + host
  }
  if (host.slice(-1) == '/') {
    host = host.slice(0, -1)
  }

  this.host = host;
  this.key = key;
  this.secret = secret;
  this.document = new Document(this);
};

Client.prototype.sign = function(url, date, body) {
  var hasher = crypto.createHmac('sha256', this.secret)
  hasher.update(url);
  hasher.update(date);
  if (body) { hasher.update(body); }
  return 'HMAC-SHA256 Credential=' + this.key + ',Signature=' + hasher.digest('hex');
};

Client.prototype.request = function(method, resource, body) {
  var date = new Date(Date.now()).toUTCString();
  var path = version + "/" + resource;
  if (body) { body = JSON.stringify(body); }

  var options = {
    method: method,
    url: this.host + path,
    headers: {
      'Date': date,
      'Authorization': this.sign(path, date, body),
    },
    body: body,
  }
  return this._request(options);
};

Client.prototype._request = function(options) {
  return request(options);
};

function Document(client) {
  this.client = client;
};

Document.prototype.create = function(type, doc, meta) {
  var body = {type: type, doc: doc};
  if (meta) { body.meta = meta; }
  return this.client.request('post', 'documents', body);
};

Document.prototype.update = function(type, doc, meta) {
  var body = {type: type, doc: doc};
  if (meta) { body.meta = meta; }
  return this.client.request('put', 'documents', body);
};

Document.prototype.delete = function(type, id) {
  return this.client.request('delete', 'documents', {type: type, id: id});
};

module.exports = Client;