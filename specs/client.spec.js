var teapi = require('./../lib');
var Promise = require('bluebird');

describe("client", function(){
  it("should prefix host with https", function(){
    ['m01.teapi.io', 'm01.teapi.io/', 'https://m01.teapi.io', 'https://m01.teapi.io/'].forEach(function(host){
      var client = teapi(host, 'key', 'secret')
      expect(client.host).toEqual('https://m01.teapi.io')
    })
  });

  it("allows http scheme for host", function(){
    ['http://m02.teapi.io','http://m02.teapi.io/'].forEach(function(host){
      var client = teapi(host, 'key', 'secret')
      expect(client.host).toEqual('http://m02.teapi.io')
    })
  });

  it("retries request on timestamp error", function(done){
    var called = 0;
    var client = teapi('test.teapi.io', 'key', 'secret')
    spyOn(client, '_request').andCallFake(function(options) {
      called++;
      if (called == 1) {
        return Promise.resolve([{statusCode: 401, body: '{"date":"server-date"}'}])
      }
      if (called == 2) {
        expect(options.headers['Date']).toEqual('server-date');
        return Promise.resolve('ok')
      }
      Promise.reject('too many calls')
    });
    client.request('post', 'documents', {id: 44}).then(function(res) {
      expect(res).toEqual('ok')
      done()
    });
  });
});
