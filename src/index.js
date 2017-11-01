import Game from 'components/Game.js'
import {resizeCanvas} from './Utils.js'
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
