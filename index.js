var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

module.exports = function createScenes (options) {
  options = options || {}
  var sceneList = options.scenes || []

  function scenes (options) {
    return createScene(options)
  }

  scenes.active = null
  scenes.previous = null

  function createScene (options) {
    var scene = Scene(options)
    sceneList.push(scene)
    return scene
  }

  scenes.set = function (scene) {
    scenes.previous = scenes.active
    if (scenes.active !== null) scenes.active.emit('end')
    if (typeof scene === 'string') {
      scene = scenes.get(scene)
    }
    scenes.active = scene
    scene.emit('start', scene)
  }

  scenes.get = function (sceneName) {
    for (var i = 0; i < sceneList.length; i++) {
      if (sceneList[i].name === sceneName) {
        return sceneList[i]
      }
    }
  }

  scenes.update = function (dt) {
    scenes.active.update(dt)
  }

  scenes.draw = function (context) {
    scenes.active.draw(context)
  }

  scenes.create = createScene
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
