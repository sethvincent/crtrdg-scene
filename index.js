var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = SceneManager;

function SceneManager(options){
  this.game = options.game || {};
  this.game.scenes = options.scenes || [];

  this.game.sceneManager = this;
  this.game.currentScene = null;

  return this;
};

SceneManager.prototype.add = function(scene){
  this.game.scenes.push(scene);

  return this;
};

SceneManager.prototype.create = function(options){
  var scene = new Scene(options);
  this.add(scene);
  return scene;
};

SceneManager.prototype.set = function(scene){
  this.game.currentScene = scene;
  scene.emit('init');
};

SceneManager.prototype.get = function(sceneName){
  for (var i=0; i<this.game.scenes.length; i++){
    if (this.game.scenes[i].name === sceneName) {
      return this.game.scenes[i];
    }
  }
};

SceneManager.prototype.update = function(interval){
  this.game.currentScene.update(interval);
};

SceneManager.prototype.draw = function(context){
  this.game.currentScene.draw(context);
};


exports.Scene = Scene;
inherits(Scene, EventEmitter);

function Scene(options){
  this.name = options.name;
  this.backgroundColor = options.backgroundColor;

  return this;
}

Scene.prototype.update = function(interval){
  this.emit('update', interval)
};

Scene.prototype.draw = function(context){
  this.emit('draw', context);
};