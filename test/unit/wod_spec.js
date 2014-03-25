/* jshint expr:true */

'use strict';

process.env.DBNAME = 'wods-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
//var exec = require('child_process').exec;
//var fs = require('fs');
var Wod, wod;

describe('User', function(){

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
                      categorie: 'AMRAP',
                      movement: ['thruster', 'jumprope'],
                      instructions: 'run in circles'
      });
      wod.insert();
      done();
    });
  });

  describe('new', function(){
    it('should create a new User object', function(done){
      expect(wod).to.be.instanceof(Wod);
      expect(wod.name).to.equal('Angie');
      expect(wod.categorie).to.equal('AMRAP');
      done();
    });
  });
});
