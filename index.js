var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Scenes;

function Scenes(game){
  this.game = game || {};
  this.scenes = [];
  this.active = null;
  this.previous = null;
  var self = this;

  this.game.on('update', function(interval){
    if (self.active) self.active.update(interval);
  });

  this.game.on('draw', function(context){
    if (self.active) self.active.draw(context);
  });
};

Scenes.prototype.add = function(scene){
  this.scenes.push(scene);
  return this;
};

Scenes.prototype.create = function(options){
  var scene = new Scene(options);
  this.add(scene);
  return scene;
};

Scenes.prototype.set = function(scene){
  if (this.active !== null) this.active.emit('end');
  this.active = scene;
  scene.emit('start', scene);
};

Scenes.prototype.get = function(sceneName){
  for (var i=0; i<this.scenes.length; i++){
    if (this.scenes[i].name === sceneName) {
      return this.scenes[i];
    }
  }
};


exports.Scene = Scene;
inherits(Scene, EventEmitter);

function Scene(options){
  for (var key in options){
    this[key] = options[key];
  }
}

Scene.prototype.update = function(interval){
  this.emit('update', interval)
};

Scene.prototype.draw = function(context){
  this.emit('draw', context);
};
