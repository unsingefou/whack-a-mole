function Plot(xpos, ypos, width, height, color, context, onHit) {
  this.xpos = xpos
  this.ypos = ypos
  this.originX = xpos
  this.originY = ypos
  this.width = width
  this.height = height
  this.color = color
  this.context = context
  this.selected = false
  this.onHit = onHit
  console.log("x:" + this.xpos + " y:"+ this.ypos)
}

Plot.prototype.checkHit = function(layerX, layerY) {
  if (layerX > this.xpos && layerX < (this.xpos + this.width) && layerY > this.ypos && layerY < (this.ypos + this.height)) {
    this.hit()
  }
}

Plot.prototype.hit = function() {
  console.log("hit!")
}

Plot.prototype.update = function() {
  this.context.fillStyle = this.color
  this.context.fillRect(this.xpos, this.ypos, this.width, this.height)
}

export default Plot
