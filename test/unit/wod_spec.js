/* jshint expr:true */

'use strict';

process.env.DBNAME = 'wods-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
//var exec = require('child_process').exec;
//var fs = require('fs');
var Wod, wod, wodName, wodId;

describe('Wod', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Wod = require('../../app/models/wod');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      wod  = new Wod({name:'Angie',
                      summary:'1234',
                      category: 'AMRAP',
                      movement: ['thruster', 'jumprope'],
                      instructions: 'run in circles'
      });
      wod.insert(function(){
        wodId = wod._id;
        wodName = wod.name;
        done();
      });

    });
  });

  describe('new', function(){
    it('should create a new User object', function(done){
      expect(wod).to.be.instanceof(Wod);
      expect(wod.name).to.equal('Angie');
      expect(wod.category).to.equal('AMRAP');
      done();
    });
  });

  describe('.findByName', function(){
    it('should find by wod name', function(done){
      Wod.findByName(wodName, function(wod){
        expect(wod.name).to.equal('Angie');
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all wods', function(done){
      Wod.findAll(function(wods){
        console.log(wods);
        expect(wods).to.have.length(1);
        done();
      });
    });
  });
});
