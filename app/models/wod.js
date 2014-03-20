'use strict';

module.exports = Wod;
var wods = global.nss.db.collection('wods');
//var Mongo = require('mongodb');
//var _ = require('lodash');
//var fs = require('fs');
//var path = require('path');

function Wod(wod){
  this.name = wod.name;
  this.summary = wod.summary;
  this.categories = wod.categories || [];
}

//<------New Wod------>//
Wod.prototype.insert = function(fn){
  wods.insert(this, function(err){
    fn(err);
  });
};
