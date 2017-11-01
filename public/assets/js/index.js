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


document.addEventListener( 'DOMContentLoaded', function () {
  var game = new __WEBPACK_IMPORTED_MODULE_0__Game_js__["a" /* default */]()

  document.getElementById('start').addEventListener('click', function() {
    game.setPlaying(true)
  }, false)

  document.getElementById('stop').addEventListener('click', function() {
    game.setPlaying(false)
  }, false)

  document.getElementById('reset').addEventListener('click', function() {
    console.log("reset")
  }, false)

}, false )


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Canvas_js__ = __webpack_require__(2);


function Game() {
  this.canvas = new __WEBPACK_IMPORTED_MODULE_0_components_Canvas_js__["a" /* default */]()
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Mole_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_Hole_js__ = __webpack_require__(6);



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
    holes.push(new __WEBPACK_IMPORTED_MODULE_1_components_Hole_js__["a" /* default */](canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.5, canvas.height * 0.5, context, onHit))
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Constants_js__ = __webpack_require__(4);
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
  this.animationState = __WEBPACK_IMPORTED_MODULE_0__Constants_js__["b" /* UP */]
  this.speed = height * 0.08
  this.sScaleFactor = (((height - this.speed) * (this.maxSHeight / height)) - this.maxSHeight) / this.speed * -1
}

Mole.prototype.checkHit = function(layerX, layerY) {
  if (layerX > this.xpos && layerX < (this.xpos + this.width) && layerY > this.ypos && layerY < (this.ypos + this.height)) {
    this.hit()
  }
}

Mole.prototype.hit = function() {
  this.currentImage = this.imageHit
  this.onHit(100);
  this.setAnimationState(__WEBPACK_IMPORTED_MODULE_0__Constants_js__["a" /* DOWN */])
}

Mole.prototype.setAnimationState = function (state) {
  this.animationState = state;
}

Mole.prototype.triggerWait = function (nextState) {
  this.setAnimationState(__WEBPACK_IMPORTED_MODULE_0__Constants_js__["c" /* WAIT */])
  var min = 0, max = 1000
  if(nextState === __WEBPACK_IMPORTED_MODULE_0__Constants_js__["b" /* UP */]) {
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
  if(this.animationState === __WEBPACK_IMPORTED_MODULE_0__Constants_js__["b" /* UP */]) {
    this.sHeight += this.speed * this.sScaleFactor
    this.height += this.speed
    this.ypos -= this.speed
    if(this.sHeight >= this.maxSHeight && this.height >= this.maxHeight) {
      this.triggerWait(__WEBPACK_IMPORTED_MODULE_0__Constants_js__["a" /* DOWN */])
    }
  } else if(this.animationState === __WEBPACK_IMPORTED_MODULE_0__Constants_js__["a" /* DOWN */]) {
    this.sHeight -= this.speed * this.sScaleFactor
    this.height -= this.speed
    this.ypos += this.speed
    if(this.sHeight <= this.minSHeight && this.height <= this.minHeight) {
      this.resetPos()
      this.triggerWait(__WEBPACK_IMPORTED_MODULE_0__Constants_js__["b" /* UP */])
    }
  }
  this.context.drawImage(this.currentImage, 0, 0, this.sWidth, this.sHeight, this.xpos, this.ypos, this.width, this.height)
}

/* harmony default export */ __webpack_exports__["a"] = (Mole);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return WAIT; });
var UP = 'UP'
var DOWN = 'DOWN'
var WAIT = 'WAIT'


/***/ }),
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
  this.color = '#00a96d'
  this.context = context
  this.onHit = onHit
  this.image = document.getElementById('hole')
  this.holeWidth = Math.round(this.width * 0.75)
  this.holeHeight = Math.round(298 * this.holeWidth / 956)
  this.holeXPos = this.xpos + Math.round((this.width - this.holeWidth) * 0.5)
  this.holeYPos = this.xpos + Math.round((this.height - this.holeHeight) * 0.25) * 3

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
  this.context.fillStyle = this.color
  this.context.fillRect(this.xpos, this.ypos, this.width, this.height)
  this.mole.update()
  this.context.drawImage(this.image, this.holeXPos, this.holeYPos, this.holeWidth, this.holeHeight)
}

/* harmony default export */ __webpack_exports__["a"] = (Hole);


/***/ })
/******/ ]);