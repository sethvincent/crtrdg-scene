var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

module.exports = function createScenes (options) {
  options = options || {}
  var sceneList = options.scenes || []

  function scenes (options) {
    var scene = Scene(options)
    sceneList.push(scene)
    return scene
  }

  scenes.active = null
  scenes.previous = null

  scenes.create = function (options) {
    var scene = Scene(options)
    sceneList.push(scene)
    return scene
  }

  scenes.set = function (scene) {
    if (this.active !== null) this.active.emit('end')
    if (typeof scene === 'string') {
      scene = scenes.get(scene)
    }
    this.active = scene
    scene.emit('start', scene)
  }

  scenes.get = function (sceneName) {
    for (var i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i].name === sceneName) {
        return this.scenes[i]
      }
    }
  }

  scenes.update = function (dt) {
    scenes.active.update(dt)
  }

  scenes.draw = function (context) {
    scenes.active.draw(context)
  }

  return scenes
}

exports.Scene = Scene
inherits(Scene, EventEmitter)

function Scene (options) {
  if (!(this instanceof Scene)) return new Scene(options)
  for (var key in options) {
    this[key] = options[key]
  }
}

Scene.prototype.update = function (interval) {
  this.emit('update', interval)
}

Scene.prototype.draw = function (context) {
  this.emit('draw', context)
}
