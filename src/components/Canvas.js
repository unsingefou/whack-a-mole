import Mole from 'components/Mole.js'

function Canvas() {
  this.canvas = document.getElementById("canvas")
  this.ctx = this.canvas.getContext("2d")
  this.isMouseDown = false
  this.canvas.onmousedown = this.mouseDown.bind(this)
  this.canvas.onmouseup = this.mouseUp.bind(this)
  this.updateScore = this.updateScore.bind(this)
  this.moles = initMoles(this.canvas, this.ctx, this.updateScore)
  this.score = 0;

}

Canvas.prototype.update = function (){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  updateMoles(this.moles)
}

Canvas.prototype.mouseDown = function(e) {
  this.isMouseDown = true
  console.log("mouse down!")
}

Canvas.prototype.mouseUp = function(e) {
  checkHitMoles(this.moles, e)
  this.isMouseDown = false
  console.log("mouse up!")
}

Canvas.prototype.updateScore = function(value) {
  this.score += value
  console.log(this.score);
}

function initMoles(canvas, context, onHit) {
  var moles = []
  for (var i = 0; i<1; i++) {
    moles.push(new Mole(canvas.width * 0.5 - 20 * i, canvas.height * 0.5 - 20 * i, context, onHit))
  }
  return moles
}

function updateMoles(moles) {
  moles.forEach(function(mole){
    mole.update()
  });
}

function checkHitMoles(moles, e) {
  console.log(e)
  moles.forEach(function(mole){
    mole.checkHit(e.layerX, e.layerY)
  });
}

export default Canvas
