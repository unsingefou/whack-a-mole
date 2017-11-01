import {UP, DOWN, WAIT} from 'Constants.js'
import {getRandomIntInclusive} from 'Utils.js'

function Mole(xpos, ypos, width, height, context, onHit) {
  this.xpos = xpos
  this.ypos = ypos
  this.context = context
  this.originX = xpos
  this.originY = ypos
  this.width = width
  this.height = 0
  this.sWidth = 500
  this.sHeight = 0
  this.maxHeight = height
  this.maxSHeight = 500
  this.minHeight = 0
  this.minSHeight = 0
  this.selected = false
  this.onHit = onHit
  this.defaultImage = document.getElementById('diglet')
  this.currentImage = this.defaultImage
  this.imageHit = document.getElementById('diglet-hit')
  this.animationState = UP
  this.speed = height * 0.08
  this.sScaleFactor = (((height - this.speed) * (this.maxSHeight / height)) - this.maxSHeight) / this.speed * -1

  this.init()
}

Mole.prototype.init = function () {
  this.triggerWait(UP)
};

Mole.prototype.checkHit = function(layerX, layerY) {
  if (layerX > this.xpos && layerX < (this.xpos + this.width) && layerY > this.ypos && layerY < (this.ypos + this.height)) {
    this.hit()
  }
}

Mole.prototype.hit = function() {
  this.currentImage = this.imageHit
  this.onHit(100);
  this.setAnimationState(DOWN)
}

Mole.prototype.setAnimationState = function (state) {
  this.animationState = state;
}

Mole.prototype.triggerWait = function (nextState) {
  this.setAnimationState(WAIT)
  var min = 0, max = 1000
  if(nextState === UP) {
    min = 1000, max = 5000
  }
  setTimeout(this.setAnimationState.bind(this, nextState), getRandomIntInclusive(min, max))
}

Mole.prototype.resetPos = function () {
  this.ypos = this.originY
  this.sHeighth = this.minSHeight
  this.height = this.minHeight
  this.currentImage = this.defaultImage
}

Mole.prototype.update = function() {
  if(this.animationState === UP) {
    this.sHeight += this.speed * this.sScaleFactor
    this.height += this.speed
    this.ypos -= this.speed
    if(this.sHeight >= this.maxSHeight && this.height >= this.maxHeight) {
      this.triggerWait(DOWN)
    }
  } else if(this.animationState === DOWN) {
    this.sHeight -= this.speed * this.sScaleFactor
    this.height -= this.speed
    this.ypos += this.speed
    if(this.sHeight <= this.minSHeight && this.height <= this.minHeight) {
      this.resetPos()
      this.triggerWait(UP)
    }
  }
  this.context.drawImage(this.currentImage, 0, 0, this.sWidth, this.sHeight, this.xpos, this.ypos, this.width, this.height)
}

export default Mole
