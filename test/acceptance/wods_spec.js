'use strict';

process.env.DBNAME = 'wod-test';
var app = require('../../app/app');
var request = require('supertest');
//var fs = require('fs');
//var exec = require('child_process').exec;
var expect = require('chai').expect;


//gobal variables
var User, Wod, wod/*, wodId*/;

describe('wods', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function (err, res){
      User = require('../../app/models/user');
      Wod = require('../../app/models/wod');
      done();
    });
  });

  beforeEach(function(done){
    wod  = new Wod({name:'Angie',
                        summary:'1234',
                        category: 'AMRAP',
                        movement: ['thruster', 'jumprope'],
                        instructions: 'run in circles'});
    wod.insert(function(wod){
      done();
    });
  });

  describe('GET /wods', function(){
    it('should display all wods', function(done){
      request(app)
      .get('/wods')
      .expect(200, done);
    });
  });

  describe('GET /wods/all', function(){
    it('should display page to create a new wod', function(done){
      request(app)
      .get('/wods/all')
      .end(function(err, res){
        console.log(res.body[0]);
        expect(res.body[0]).to.be.instanceof(Object);
        done();
      });
    });
  });

/*
  describe('GET /wods/:id', function(){
    it('should show the the profile of a wod', function(done){
      request(app)
      .get('/wods/' + listingId)
      .expect(200, done);
    });
  });

  describe('DELETE /wods/:id', function(){
    it('should delete a specific item from the database', function(done){
      request(app)
      .del('/wods/' + listingId)
      .expect(302, done);
    });
  });

  describe('POST /wods/reserve', function(){
    it('should create a reservation on a wod', function(done){
      request(app)
      .post('/wods/reserve')
      .field('artistName', 'Jay Knight')
      .field('artistId', '148111111111111111111111')
      .field('wodId', listingId)
      .field('reservedDate', '04/20/14')
      .expect(302, done);
    });
  });

/*
  describe('AUTHORIZED', function(){
    beforeEach(function(done){
        cookie = res.headers['set-cookie'];
        done();
      });
    });
    describe('POST /wods/', function(){
      it('should post wod and redirect to user profile', function(done){
        request(app)
        .post('/wods')
        .expect(302, done);
      });
    });
  });
*/
//End//
});
