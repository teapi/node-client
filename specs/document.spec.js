var teapi = require('./../lib');
var Promise = require('bluebird');

describe("document", function(){
  beforeEach(function(){
    spyOn(Date, 'now').andReturn(872838840000);
  });

  it("posts a new document", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'post', {type: 'atreides', doc: {name: 'leto', age: 3692}}, '3986423888e2239975a090c73b56d0277be6f12d66cf9458c5b8ae1c6dc6b681')
    });
    tp.document.create('atreides', {name: 'leto', age: 3692}).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("posts a new document with meta", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'post', {type: 'atreides', doc: {name: 'leto', age: 3692}, meta: {other: true}}, '00885bf403db959fb609010c40f249e1ff01babd060a397596007707b64cda66')
    });
    tp.document.create('atreides', {name: 'leto', age: 3692}, {other: true}).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("updates a document", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'put', {type: 'saiyans', doc: {name: 'goku', age: 9001}}, '6ffd020b0230fbf4390ce2d469f6718775bfcf52e078622d89a78f84cd3c9e0b')
    });
    tp.document.update('saiyans', {name: 'goku', age: 9001}).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("updates a document with meta", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'put', {type: 'saiyans',doc: {name: 'goku', power: 90002}, meta: {super: true}}, 'c21387c7d85b7393b53eb596d32d2c19ad2a4b959d627740d85a77b32aebb2a5')
    });
    tp.document.update('saiyans', {name: 'goku', power: 90002}, {super: true}).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("deletes the document", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'delete', {type: 'harkonnen',id: 4994}, 'fc8983b543a67040f046540f146b74a6a84f56fa9aa343ec26b0cfb6fa2f3244')
    });
    tp.document.delete('harkonnen', 4994).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("bulk updates documents", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'post', {type: 'articles', deletes: [{id: 92}], upserts: [{doc: {id:4}}, {doc: {id:5}}]}, '76e3907c084b37ddb94437f00cb53bddfae5df95671563f8fbf98266c8ea8730')
    });
    tp.document.bulk('articles', [{doc: {id:4}}, {doc: {id:5}}], [{id: 92}]).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  function assertOptions(options, method, body, sig) {
    expect(options.method).toEqual(method)
    expect(options.body).toEqual(JSON.stringify(body))
    expect(options.url).toEqual('https://test.teapi.io/v1/documents')
    expect(options.headers['Date']).toEqual('Fri, 29 Aug 1997 07:14:00 GMT')
    expect(options.headers['Authorization']).toEqual('HMAC-SHA256 Credential=12399akk4ja,Signature=' + sig)
    return Promise.resolve([{statusCode: 200}]);
  };
});
