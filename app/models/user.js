
'use strict';

module.exports = User;
var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

function User(user){
  this.name = user.name;
  this.email = user.email || null;
  this.password = user.password || '';
  this.wods = [];
  this.wodsCompleted = [];
  this.finishedWods = [];
}


User.prototype.hashPassword = function(fn){
  var self = this;
  bcrypt.hash(self.password, 8, function(err, hash){
    self.password = hash;
    fn(err);
  });
};

User.prototype.insert = function(fn){
  var self = this;
  users.findOne({email:self.email}, function(err, record){
    if(!record){
      users.insert(self, function(err, records){
        fn(err);
      });
    }else{
      fn(err);
    }
  });
};
/*
db.schools.find( { zipcode: 63109 },
                 { students: { $elemMatch: { school: 102 } } } )
*/

User.prototype.updateWods = function(wod,fn){
  this.wodsCompleted.push(wod);
  var date = new Date().toLocaleDateString();
  var x = {name:wod.name, date:date, finished:false};
  this.wods.push(x);
  users.update({_id:this._id}, this, function(err, count){
    fn(count);
  });
};

/*
exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

User.prototype.addPhoto = function(oldpath){
  var dirname = this.email.replace(/\W/g,'').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/users/' + dirname;
  fs.mkdirSync(abspath + relpath);

  var extension = path.extname(oldpath);
  relpath += '/photo' + extension;
  fs.renameSync(oldpath, abspath + relpath);

  this.userPhoto = relpath;
};
*/

User.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);

  users.findOne({_id:_id}, function(err, record){
    fn(_.extend(record, User.prototype));
  });
};

User.finished = function(email, wodName, date, score, fn){
  users.findOne({email:email}, { wods: { $elemMatch: { date:date, name:wodName } } }, function(err, record){
    users.findOne({email:email}, function(err, user){
      record.score = score;
      record.date = date;
      record.name = record.wods[0].name;
      delete record.wods;
      user.finishedWods.push(record);
      users.update({_id:user._id}, user, function(err, count){
        users.update({email:email}, { $pull: { wods: { date:date, name:wodName } } }, function(err, record){
          fn(count);
        });
      });
    });
  });
};

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, record){
    if(record){
      bcrypt.compare(password, record.password, function(err, result){
        if(result){
          fn(record);
        }else{
          fn(null);
        }
      });
    }else{
      fn(null);
    }
  });
};

User.prototype.addCover = function(oldpath){
  var dirname = this.email.replace(/\W/g,'').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/users/' + dirname;
  fs.mkdirSync(abspath + relpath);

  var extension = path.extname(oldpath);
  relpath += '/cover' + extension;
  fs.renameSync(oldpath, abspath + relpath);

  this.cover = relpath;
};



/*
User.findFinishedByName = function(id, name, fn){
  console.log(id);
  users.find({ finishedWods: { $elemMatch: { name:name} } }).toArray(function(err, wods){
    fn(wods[0]);
  });
};
*/
