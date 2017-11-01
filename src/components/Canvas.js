import Hole from 'components/Hole.js'
import {PLAY} from 'Constants.js'

function Canvas() {
  this.canvas = document.getElementById("canvas")
  this.ctx = this.canvas.getContext("2d")
  this.canvas.onmouseup = this.mouseUp.bind(this)
  this.updateScore = this.updateScore.bind(this)
  this.holes = []
  this.score = 0
  this.fontColor = '#ffffff'
  this.color = '#00a96d'
  this.menu = document.getElementById('menu')
  this.scoreMenu = document.getElementById('score')
  this.init()
}

Canvas.prototype.init = function () {
  this.ctx.font = "30px Arial"
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.holes = initHoles(this.canvas, this.ctx, this.updateScore)
  this.score = 0
}

Canvas.prototype.render = function (timer, state){
  this.state = state
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.ctx.fillStyle = this.color
  this.ctx.fillRect(0, 0, canvas.width, canvas.height)
  updateHoles(this.holes)
  this.ctx.fillStyle = this.fontColor
  this.ctx.fillText("Time: " + Math.ceil(timer/1000), 10, 50)
  this.ctx.fillStyle = this.fontColor
  this.ctx.fillText("Score: " + this.score, this.canvas.width - 200, 50)
}

Canvas.prototype.mouseUp = function(e) {
  checkHitHoles(this.holes, e)
}

Canvas.prototype.updateScore = function(value) {
  this.score += value
}

Canvas.prototype.renderMenu = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.ctx.drawImage(this.menu, 0, 0, this.canvas.width, this.canvas.height)
}

Canvas.prototype.renderScore = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.ctx.drawImage(this.scoreMenu, 0, 0, this.canvas.width, this.canvas.height)
  this.ctx.fillStyle = this.fontColor
  this.ctx.fillText("Score: " + this.score, this.canvas.width * 0.5 - 50, this.canvas.height * 0.25)
}

function initHoles(canvas, context, onHit) {
  var holes = []
  var rows = 3
  var holeWidth = canvas.width * 0.33
  var holeHeight = canvas.height * 0.33
  for (var i = 0; i<rows; i++) {
    for(var j = 0; j<rows; j++) {
      holes.push(new Hole(holeWidth * j, holeHeight * i, holeWidth, holeHeight, context, onHit))
    }
  }
  return holes
}

function updateHoles(holes) {
  holes.forEach(function(hole){
    hole.render()
  });
}

function checkHitHoles(holes, e) {
  holes.forEach(function(hole){
    hole.checkHit(e)
  });
}

export default Canvas
