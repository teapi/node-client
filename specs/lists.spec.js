var teapi = require('./../lib');
var Promise = require('bluebird');

describe("lists", function(){
  beforeEach(function(){
    spyOn(Date, 'now').andReturn(872838840000);
  });

  it("inserts a single list id", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'post', 'lists', {type: 'atreides', list: 'recent', ids: [9001]}, 'c41788478cab3fd52d79e9f4187fa30001b5b7d562d026d36f8a049f7653c881')
    });
    tp.lists.insert('atreides', 'recent', 9001).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("inserts a multiple ids with a truncate", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'post', 'lists', {type: 'atreides', list: 'recent', truncate: true, ids: ['abc','213']}, '1b47c0c5e4d1f867823660a58de613fd7a2378abd274b587a4757c2dbeb21073')
    });
    tp.lists.insert('atreides', 'recent', ['abc','213'], true).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("deletes all", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'delete', 'lists', {type: 'atreides', list: 'recent', ids: null}, 'bd13e16a2c161f4eed2de1baa90e1ce368cfe5cad876e1b8e3016078af3ee52b')
    });
    tp.lists.delete('atreides', 'recent').then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("deletes a single id", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'delete', 'lists', {type: 'atreides', list: 'recent', ids: ['abd']}, '9fb297214026e490d2432bfeffebec4d95f909b2d7e89e27911f71be8d8d6b8e')
    });
    tp.lists.delete('atreides', 'recent', 'abd').then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });

  it("deletes the ids", function(done){
    tp = teapi('test.teapi.io', '12399akk4ja', 'over9000!');
    spyOn(tp, '_request').andCallFake(function(options) {
      return assertOptions(options, 'delete', 'lists', {type: 'atreides', list: 'recent', ids: [123,9438]}, '4445387aaac517735a454277e7afb220de1de13854b2d29f28bb654628898898')
    });
    tp.lists.delete('atreides', 'recent', [123,9438]).then(function(res){
      expect(tp._request).toHaveBeenCalled();
      done();
    });
  });
});
