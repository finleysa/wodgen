'use strict';

module.exports = Wod;
var wods = global.nss.db.collection('wods');
//var users = global.nss.db.collection('users');
//var Mongo = require('mongodb');
//var _ = require('lodash');
//var fs = require('fs');
//var path = require('path');

function Wod(wod){
  this.name = wod.name;
  this.summary = wod.summary;
  this.category = wod.category;
  this.movement = wod.movement;
  this.instructions = wod.instructions;
}

//<------New Wod------>//
Wod.prototype.insert = function(fn){
  wods.insert(this, function(err){
    fn();
  });
};

Wod.findAll = function(fn){
  wods.find().toArray(function(err, records){
    fn(records);
  });
};

Wod.findByName = function(name, fn){
  wods.find({name:name}).toArray(function(err, wod){
    fn(wod[0]);
  });
};

