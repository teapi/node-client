var teapi = require('./../lib');

describe("client", function(){
  it("should prefix host with https", function(){
    ['m01.teapi.io', 'm01.teapi.io/', 'https://m01.teapi.io', 'https://m01.teapi.io/'].forEach(function(host){
      client = teapi(host, 'key', 'secret')
      expect(client.host).toEqual('https://m01.teapi.io')
    })
  });

  it("allows http scheme for hot", function(){
    ['http://m02.teapi.io','http://m02.teapi.io/'].forEach(function(host){
      client = teapi(host, 'key', 'secret')
      expect(client.host).toEqual('http://m02.teapi.io')
    })
  });
});
