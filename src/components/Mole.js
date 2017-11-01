import {UP, DOWN, WAIT} from './Constants.js'
import {getRandomIntInclusive} from 'Utils.js'

function Mole(xpos, ypos, context, onHit) {
  this.xpos = xpos
  this.ypos = ypos
  this.context = context
  this.originX = xpos
  this.originY = ypos
  this.width = 50
  this.height = 0
  this.sWidth = 500
  this.sHeight = 0
  this.maxHeight = 50
  this.maxSHeight = 500
  this.minHeight = 0
  this.minSHeight = 0
  this.selected = false
  this.onHit = onHit
  this.image = document.getElementById('diglet')
  this.animationState = UP
  this.speed = 4
}

Mole.prototype.checkHit = function(layerX, layerY) {
  if (layerX > this.xpos && layerX < (this.xpos + this.width) && layerY > this.ypos && layerY < (this.ypos + this.height)) {
    this.hit()
  }
}

Mole.prototype.hit = function() {
  console.log("hit!")
  this.setAnimationState(DOWN)
}

Mole.prototype.setAnimationState = function (state) {
  this.animationState = state;
}

Mole.prototype.triggerWait = function (nextState) {
  this.setAnimationState(WAIT)
  var min = 0, max = 500
  if(nextState === UP) {
    min = 1000, max = 5000
  }
  setTimeout(this.setAnimationState.bind(this, nextState), getRandomIntInclusive(min, max))
}

Mole.prototype.resetPos = function () {
  this.ypos = this.originY
  this.sHeighth = this.minSHeight
  this.height = this.minHeight
}

Mole.prototype.update = function() {
  if(this.animationState === UP) {
    this.sHeight += this.speed * 10
    this.height += this.speed
    this.ypos -= this.speed
    if(this.sHeight >= this.maxSHeight && this.height >= this.maxHeight) {
      this.triggerWait(DOWN)
    }
  } else if(this.animationState === DOWN) {
    this.sHeight -= this.speed * 10
    this.height -= this.speed
    this.ypos += this.speed
    if(this.sHeight <= this.minSHeight && this.height <= this.minHeight) {
      this.resetPos()
      this.triggerWait(UP)
    }
  }
  //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  this.context.drawImage(this.image, 0, 0, 500, this.sHeight, this.xpos, this.ypos, this.width, this.height)
}

export default Mole
