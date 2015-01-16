Promise = require('bluebird');

module.exports = {
  assertOptions: function(options, method, resource, body, sig) {
    expect(options.method).toEqual(method);
    expect(options.body).toEqual(JSON.stringify(body));
    expect(options.url).toEqual('https://test.teapi.io/v1/' + resource);
    expect(options.headers['Date']).toEqual('Fri, 29 Aug 1997 07:14:00 GMT');
    expect(options.headers['Authorization']).toEqual('HMAC-SHA256 Credential=12399akk4ja,Signature=' + sig);
    return Promise.resolve([{statusCode: 200}]);
  }
};
