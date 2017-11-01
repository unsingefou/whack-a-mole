import Mole from 'components/Mole.js'
import Hole from 'components/Hole.js'

function Canvas() {
  this.canvas = document.getElementById("canvas")
  this.ctx = this.canvas.getContext("2d")
  this.canvas.onmouseup = this.mouseUp.bind(this)
  this.updateScore = this.updateScore.bind(this)
  this.holes = initHoles(this.canvas, this.ctx, this.updateScore)
  this.score = 0
}

Canvas.prototype.update = function (){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  updateHoles(this.holes)
}

Canvas.prototype.mouseUp = function(e) {
  checkHitHoles(this.holes, e)
}

Canvas.prototype.updateScore = function(value) {
  this.score += value
  console.log(this.score);
}

function initHoles(canvas, context, onHit) {
  var holes = []
  for (var i = 0; i<1; i++) {
    holes.push(new Hole(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.5, canvas.height * 0.5, context, onHit))
  }
  return holes
}

function updateHoles(holes) {
  holes.forEach(function(hole){
    hole.update()
  });
}

function checkHitHoles(holes, e) {
  holes.forEach(function(hole){
    hole.checkHit(e)
  });
}

export default Canvas
