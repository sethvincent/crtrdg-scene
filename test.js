var Game = require('crtrdg-gameloop');
var Mouse = require('crtrdg-mouse')
var Scenes = require('./index');

var game = new Game({
  canvas: 'game',
  width: '800',
  height: '400'
});

var mouse = new Mouse(game);

mouse.on('click', function(location){
  if (scenes.active.name === 'first scene') scenes.set(sceneTwo);
  else scenes.set(scene);
});

var scenes = new Scenes(game);

var scene = scenes.create({
  name: 'first scene'
});

scene.on('start', sceneSwitch);

scene.on('draw', function(c){
  console.log('scene one drawing')
  c.fillStyle = '#e1f23f';
  c.fillRect(0, 0, game.width, game.height);
});

scenes.set(scene);

var sceneTwo = scenes.create({
  name: 'second scene',
  backgroundColor: '#7def71'
});

sceneTwo.on('start', sceneSwitch);

sceneTwo.on('draw', function(c){
  console.log('scene two drawing')
  c.fillStyle = sceneTwo.backgroundColor;
  c.fillRect(0, 0, game.width, game.height);
});

function setMessage(text){
  document.getElementById('scene-name').innerHTML = text;
}

function sceneSwitch(scene){
  console.log(scene.name)
  setMessage(scene.name);
}