import Mole from 'components/Mole.js'

function Hole(xpos, ypos, width, height, context, onHit) {
  this.xpos = xpos
  this.ypos = ypos
  this.width = width
  this.height = height
  this.color = '#00a96d'
  this.context = context
  this.onHit = onHit
  this.image = document.getElementById('hole')
  this.holeWidth = Math.round(this.width * 0.75)
  this.holeHeight = Math.round(298 * this.holeWidth / 956)
  this.holeXPos = this.xpos + Math.round((this.width - this.holeWidth) * 0.5)
  this.holeYPos = this.xpos + Math.round((this.height - this.holeHeight) * 0.25) * 3

  this.moleWidth = Math.round(this.holeWidth * 0.5)
  this.moleHeight = this.moleWidth
  this.moleXpos = this.xpos + Math.round((this.width - this.moleWidth) * 0.5)
  this.moleYpos = this.holeYPos + 20
  this.mole = new Mole(this.moleXpos, this.moleYpos, this.moleWidth, this.moleHeight, context, onHit)
}

Hole.prototype.checkHit = function(e) {
  this.mole.checkHit(e.layerX, e.layerY)
}

Hole.prototype.update = function() {
  this.context.fillStyle = this.color
  this.context.fillRect(this.xpos, this.ypos, this.width, this.height)
  this.mole.update()
  this.context.drawImage(this.image, this.holeXPos, this.holeYPos, this.holeWidth, this.holeHeight)
}

export default Hole
