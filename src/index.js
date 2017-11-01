import Game from './Game.js'
import {PLAY, PAUSE, MENU, SCORE} from 'Constants.js'

document.addEventListener( 'DOMContentLoaded', function () {
  resizeCanvas()
  var game = new Game()

  document.getElementById('start').addEventListener('click', function() {
    if(game.getState() === PAUSE) {
      game.setState(PLAY)
    } else if(game.getState() === MENU) {
      game.setState(PLAY)
    } else if(game.getState() === SCORE) {
      game.reset()
    }
  }, false)

  document.getElementById('stop').addEventListener('click', function() {
    if(game.getState() === PLAY) {
      game.setState(PAUSE)
    }
  }, false)

  document.getElementById('reset').addEventListener('click', function() {
    if(game.getState() !== MENU) {
      game.reset()
    }
  }, false)

}, false )

function resizeCanvas() {
  var viewPort = window.innerWidth
  var canvas = document.getElementById('canvas')
  var width = 700
  if(viewPort <= 425) {
    width = 375
  } else if(viewPort <= 768) {
    width = 500
  }
  canvas.width = width
  canvas.height = width
}
