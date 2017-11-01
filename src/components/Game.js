import Canvas from 'components/Canvas.js'
import {PLAY, PAUSE, MENU, SCORE} from 'Constants.js'

function Game() {
  this.canvas = new Canvas()
  this.state = MENU
  this.timer = 10000
  this.interval = 50
  this.init()
}

Game.prototype.init = function () {
  this.update()
}
Game.prototype.reset = function() {
  this.setState(PLAY)
  this.canvas.init()
  this.timer = 10000
  this.score = 0
}

//This is the update loop, draw to canvas depending on the state
Game.prototype.update = function () {
  if(this.state === MENU) {
    this.canvas.renderMenu()
  } else if(this.state === PLAY) {
    if(this.timer > 0) {
      if(this.state === PLAY ) {
        this.canvas.render(this.timer)
        this.timer -= this.interval
      }
    } else {
      this.setState(SCORE)
    }
  }
  if(this.state === SCORE) {
    this.canvas.renderScore()
  }

  setTimeout(this.update.bind(this), this.interval)
}

Game.prototype.setState = function (state) {
  this.state = state
}
Game.prototype.getState = function () {
  return this.state
}

export default Game
