import Game from './Game.js'

document.addEventListener( 'DOMContentLoaded', function () {
  var game = new Game()

  document.getElementById('start').addEventListener('click', function() {
    game.setPlaying(true)
  }, false)

  document.getElementById('stop').addEventListener('click', function() {
    game.setPlaying(false)
  }, false)

  document.getElementById('reset').addEventListener('click', function() {
    console.log("reset")
  }, false)

}, false )
