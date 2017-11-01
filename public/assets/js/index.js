/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Constants_js__ = __webpack_require__(7);



document.addEventListener( 'DOMContentLoaded', function () {
  var game = new __WEBPACK_IMPORTED_MODULE_0__Game_js__["a" /* default */]()

  document.getElementById('start').addEventListener('click', function() {
    if(game.getState() === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["c" /* PAUSE */]) {
      game.setState(__WEBPACK_IMPORTED_MODULE_1_Constants_js__["d" /* PLAY */])
    } else if(game.getState() === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["b" /* MENU */]) {
      game.setState(__WEBPACK_IMPORTED_MODULE_1_Constants_js__["d" /* PLAY */])
    } else if(game.getState() === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["e" /* SCORE */]) {
      game.reset()
    }
  }, false)

  document.getElementById('stop').addEventListener('click', function() {
    if(game.getState() === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["d" /* PLAY */]) {
      game.setState(__WEBPACK_IMPORTED_MODULE_1_Constants_js__["c" /* PAUSE */])
    }
  }, false)

  document.getElementById('reset').addEventListener('click', function() {
    if(game.getState() !== __WEBPACK_IMPORTED_MODULE_1_Constants_js__["b" /* MENU */]) {
      game.reset()
    }
  }, false)

}, false )


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Canvas_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Constants_js__ = __webpack_require__(7);



function Game() {
  this.canvas = new __WEBPACK_IMPORTED_MODULE_0_components_Canvas_js__["a" /* default */]()
  this.state = __WEBPACK_IMPORTED_MODULE_1_Constants_js__["b" /* MENU */]
  this.timer = 10000
  this.interval = 50
  this.init()
}

Game.prototype.init = function () {
  this.update()
}
Game.prototype.reset = function() {
  this.setState(__WEBPACK_IMPORTED_MODULE_1_Constants_js__["d" /* PLAY */])
  this.canvas.init()
  this.timer = 10000
  this.score = 0
}

Game.prototype.update = function () {
  if(this.state === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["b" /* MENU */]) {
    this.canvas.renderMenu()
  } else if(this.state === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["d" /* PLAY */]) {
    if(this.timer > 0) {
      if(this.state === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["d" /* PLAY */] ) {
        this.canvas.update(this.timer)
        this.timer -= this.interval
      }
    } else {
      this.setState(__WEBPACK_IMPORTED_MODULE_1_Constants_js__["e" /* SCORE */])
    }
  }
  if(this.state === __WEBPACK_IMPORTED_MODULE_1_Constants_js__["e" /* SCORE */]) {
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Hole_js__ = __webpack_require__(6);


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

Canvas.prototype.update = function (timer){
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
      holes.push(new __WEBPACK_IMPORTED_MODULE_0_components_Hole_js__["a" /* default */](holeWidth * j, holeHeight * i, holeWidth, holeHeight, context, onHit))
    }
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

/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Constants_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Utils_js__ = __webpack_require__(5);



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
  this.animationState = __WEBPACK_IMPORTED_MODULE_0_Constants_js__["f" /* UP */]
  this.speed = height * 0.08
  this.sScaleFactor = (((height - this.speed) * (this.maxSHeight / height)) - this.maxSHeight) / this.speed * -1

  this.init()
}

Mole.prototype.init = function () {
  this.triggerWait(__WEBPACK_IMPORTED_MODULE_0_Constants_js__["f" /* UP */])
};

Mole.prototype.checkHit = function(layerX, layerY) {
  if (layerX > this.xpos && layerX < (this.xpos + this.width) && layerY > this.ypos && layerY < (this.ypos + this.height)) {
    this.hit()
  }
}

Mole.prototype.hit = function() {
  this.currentImage = this.imageHit
  this.onHit(100);
  this.setAnimationState(__WEBPACK_IMPORTED_MODULE_0_Constants_js__["a" /* DOWN */])
}

Mole.prototype.setAnimationState = function (state) {
  this.animationState = state;
}

Mole.prototype.triggerWait = function (nextState) {
  this.setAnimationState(__WEBPACK_IMPORTED_MODULE_0_Constants_js__["g" /* WAIT */])
  var min = 0, max = 1000
  if(nextState === __WEBPACK_IMPORTED_MODULE_0_Constants_js__["f" /* UP */]) {
    min = 1000, max = 5000
  }
  setTimeout(this.setAnimationState.bind(this, nextState), Object(__WEBPACK_IMPORTED_MODULE_1_Utils_js__["a" /* getRandomIntInclusive */])(min, max))
}

Mole.prototype.resetPos = function () {
  this.ypos = this.originY
  this.sHeighth = this.minSHeight
  this.height = this.minHeight
  this.currentImage = this.defaultImage
}

Mole.prototype.update = function() {
  if(this.animationState === __WEBPACK_IMPORTED_MODULE_0_Constants_js__["f" /* UP */]) {
    this.sHeight += this.speed * this.sScaleFactor
    this.height += this.speed
    this.ypos -= this.speed
    if(this.sHeight >= this.maxSHeight && this.height >= this.maxHeight) {
      this.triggerWait(__WEBPACK_IMPORTED_MODULE_0_Constants_js__["a" /* DOWN */])
    }
  } else if(this.animationState === __WEBPACK_IMPORTED_MODULE_0_Constants_js__["a" /* DOWN */]) {
    this.sHeight -= this.speed * this.sScaleFactor
    this.height -= this.speed
    this.ypos += this.speed
    if(this.sHeight <= this.minSHeight && this.height <= this.minHeight) {
      this.resetPos()
      this.triggerWait(__WEBPACK_IMPORTED_MODULE_0_Constants_js__["f" /* UP */])
    }
  }
  this.context.drawImage(this.currentImage, 0, 0, this.sWidth, this.sHeight, this.xpos, this.ypos, this.width, this.height)
}

/* harmony default export */ __webpack_exports__["a"] = (Mole);


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomIntInclusive;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Mole_js__ = __webpack_require__(3);


function Hole(xpos, ypos, width, height, context, onHit) {
  this.xpos = xpos
  this.ypos = ypos
  this.width = width
  this.height = height
  this.context = context
  this.onHit = onHit
  this.image = document.getElementById('hole')
  this.holeWidth = Math.round(this.width * 0.75)
  this.holeHeight = Math.round(298 * this.holeWidth / 956)
  this.holeXPos = this.xpos + Math.round((this.width - this.holeWidth) * 0.5)
  this.holeYPos = this.ypos + Math.round((this.height - this.holeHeight) * 0.25) * 3

  this.moleWidth = Math.round(this.holeWidth * 0.49)
  this.moleHeight = this.moleWidth
  this.moleXpos = this.xpos + Math.round((this.width - this.moleWidth) * 0.5)
  this.moleYpos = this.holeYPos + this.holeHeight * 0.5
  this.mole = new __WEBPACK_IMPORTED_MODULE_0_components_Mole_js__["a" /* default */](this.moleXpos, this.moleYpos, this.moleWidth, this.moleHeight, context, onHit)
}

Hole.prototype.checkHit = function(e) {
  this.mole.checkHit(e.layerX, e.layerY)
}

Hole.prototype.update = function() {
  this.mole.update()
  this.context.drawImage(this.image, this.holeXPos, this.holeYPos, this.holeWidth, this.holeHeight)
}

/* harmony default export */ __webpack_exports__["a"] = (Hole);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PLAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PAUSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MENU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SCORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WAIT; });
var PLAY = 'PLAY'
var PAUSE = 'PAUSE'
var MENU = 'MENU'
var SCORE = 'SCORE'

var UP = 'UP'
var DOWN = 'DOWN'
var WAIT = 'WAIT'


/***/ })
/******/ ]);