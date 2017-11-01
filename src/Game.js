import Canvas from 'components/Canvas.js'

function Game() {
  this.canvas = new Canvas()
  this.score = 0
  this.isMouseDown = false
  this.playing = false
}

Game.prototype.init = function () {
  
}

Game.prototype.update = function () {
  if(this.playing) {
    this.canvas.update()
    setTimeout(this.update.bind(this), 50)
  }
}

Game.prototype.setPlaying = function (val) {
  this.playing = val
  this.update()
}

export default Game
