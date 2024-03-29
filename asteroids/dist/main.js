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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\"); \nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\"); \n\nAsteroid.RADIUS = 20;\nAsteroid.COLOR = 'gray';\nAsteroid.SPEED = 5;\nAsteroid.SPRITE_SRC = '../plankton.png';\n\nfunction Asteroid(options) {\n  MovingObject.call(this, {\n    game: options.game,\n    pos: options.pos,\n    vel: Util.randomVec(Asteroid.SPEED),\n    radius: Asteroid.RADIUS,\n    color: Asteroid.COLOR\n  });\n  this.sprite = new Image();\n  this.sprite.src = Asteroid.SPRITE_SRC;\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function(otherObject) {\n  if (otherObject instanceof Ship) {\n    otherObject.relocate();\n  } else if (otherObject instanceof Bullet) {\n    this.game.remove(this);\n    this.game.remove(otherObject);\n  }\n};\n\nAsteroid.prototype.draw = function (ctx) {\n  const spritePos = Array.from(this.pos);\n  spritePos[0] -= this.radius;\n  spritePos[1] -= this.radius;\n  ctx.drawImage(this.sprite, spritePos[0], spritePos[1], this.radius*2, this.radius*2);\n};\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n// const Asteroid = require('./asteroid');\n\nBullet.RADIUS = 7;\nBullet.COLOR = 'red';\nBullet.SPRITE_SRC = '../blast.png';\n\nfunction Bullet(options) {\n  MovingObject.call(this, {\n    game: options.game,\n    pos: options.pos,\n    vel: options.vel,\n    radius: Bullet.RADIUS,\n    color: Bullet.COLOR\n  });\n  this.sprite = new Image();\n  this.sprite.src = Bullet.SPRITE_SRC;\n}\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.move = function () {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n  \n  if (this.game.isOutOfBounds(this.pos)) {\n    this.game.remove(this);\n  }\n};\n\nBullet.prototype.draw = function (ctx) {\n  const spritePos = Array.from(this.pos);\n  spritePos[0] -= this.radius;\n  spritePos[1] -= this.radius;\n  ctx.drawImage(this.sprite, spritePos[0], spritePos[1], this.radius * 2, this.radius * 2);\n};\n\n\nBullet.prototype.collideWith = function (otherObject) {\n  // if (otherObject instanceof Asteroid) {\n  //   this.game.remove(otherObject);\n  //   this.game.remove(this);\n  // }\n};\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n// Consider switching this for canvas size\nGame.DIM_X = 800;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 10;\nGame.BACKGROUND_SRC = '../bacteria.jpg';\n\nfunction Game() {\n  this.asteroids = [];\n  this.bullets = [];\n\n  this.addAsteroids();\n\n  this.ship = new Ship({ \n    pos: this.randomPosition(),\n    game: this\n  });\n\n  this.bg = new Image();\n  this.bg.src = Game.BACKGROUND_SRC;\n}\n\nGame.prototype.allObjects = function () {\n  return this.asteroids.concat(this.bullets).concat([this.ship]);\n};\n\nGame.prototype.addAsteroids = function () {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    let ast = new Asteroid({\n      pos: this.randomPosition(),\n      game: this\n    });\n    this.asteroids.push(ast);\n  }\n};\n \nGame.prototype.randomPosition = function () {\n  return [Math.random() * Game.DIM_X,\n          Math.random() * Game.DIM_Y];\n};\n\nGame.prototype.draw = function(ctx) {\n  // ctx.fillStyle = 'green';\n  // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.drawImage(this.bg, 0, 0, Game.DIM_X, Game.DIM_Y);\n  this.allObjects().forEach(obj => obj.draw(ctx));\n};\n\nGame.prototype.moveObjects = function () {\n  this.allObjects().forEach(asteroid => asteroid.move());\n};\n\nGame.prototype.wrap = function (pos) {\n  return [\n    (pos[0] + Game.DIM_X) % Game.DIM_X,\n    (pos[1] + Game.DIM_Y) % Game.DIM_Y\n  ];\n};\n\nGame.prototype.checkCollisions = function () {\n  const allObj = this.allObjects();\n\n  for (let i = 0; i < allObj.length; i++) {\n    for (let j = i+1; j < allObj.length; j++) {\n      if (allObj[i].isCollidedWith(allObj[j])) {\n        let obj1 = allObj[i];\n        let obj2 = allObj[j];\n        obj1.collideWith(obj2);\n      }\n    }\n  }\n};\n\nGame.prototype.step = function() {\n  this.moveObjects();\n  this.checkCollisions();\n};\n\nGame.prototype.remove = function(object) {\n  // this.asteroids = this.asteroids.filter((obj) => obj !== object);\n  if (object instanceof Asteroid) {\n    this.asteroids.splice(this.asteroids.indexOf(object), 1);\n  } else {\n    this.bullets.splice(this.bullets.indexOf(object), 1);\n  }\n};\n\nGame.prototype.isOutOfBounds = function(pos) {\n  return ((pos[0] < 0 || pos[0] > Game.DIM_X) ||\n          (pos[1] < 0 || pos[1] > Game.DIM_Y));\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView (game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n}\n\nGameView.prototype.start = function () {\n  const that = this;\n  \n  this.bindKeyHandlers();\n\n  setInterval(function () {\n    that.game.step();\n    that.game.draw(that.ctx);\n  }, 20);\n};\n\nGameView.prototype.bindKeyHandlers = function () {\n  const that = this;\n\n  key('w', function() {\n    that.game.ship.power([0, -5]);\n  });\n  key('a', function () {\n    that.game.ship.power([-5, 0]);\n  });\n  key('s', function () {\n    that.game.ship.power([0, 5]);\n  });\n  key('d', function () {\n    that.game.ship.power([5, 0]);\n  });\n  key('space', function () {\n    that.game.ship.fireBullet();\n  });\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n// window.MovingObject = MovingObject;\n// window.Asteroid = Asteroid;\n\ndocument.addEventListener('DOMContentLoaded', function() {\n  const canvas = document.getElementById('game-canvas');\n  const ctx = canvas.getContext('2d');\n\n  const game = new Game();\n  const gameView = new GameView(game, ctx);\n\n  gameView.start();\n\n  // game.draw(ctx);\n  window.ctx = ctx;\n  window.game = game;\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction MovingObject(options) {\n  this.game = options.game;\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);\n  // ctx.stroke();\n  ctx.fillStyle = this.color;\n  ctx.fill();\n};\n\nMovingObject.prototype.move = function() {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n  this.pos = this.game.wrap(this.pos);\n};\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n  const dist =  Util.distance(this.pos, otherObject.pos);\n  return dist < this.radius + otherObject.radius;\n};\n\nMovingObject.prototype.collideWith = function(otherObject) {\n  // this.game.remove(this);\n  // this.game.remove(otherObject);\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n// const Asteroid = require('./asteroid');\n\nShip.RADIUS = 30;\nShip.COLOR = 'yellow';\nShip.START_VEL = [0, 0];\nShip.SPRITE_SRC = '../drix.png'; \n\nfunction Ship(options) {\n  MovingObject.call(this, {\n    game: options.game,\n    pos: options.pos,\n    vel: Ship.START_VEL,\n    radius: Ship.RADIUS,\n    color: Ship.COLOR\n  });\n\n  this.sprite = new Image();\n  this.sprite.src = Ship.SPRITE_SRC;\n  this.prevVel = [5, 5];\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.draw = function (ctx) {\n  \n  const spritePos = Array.from(this.pos);\n  const scale = this.flipScale();\n  spritePos[0] *= scale[0];\n  spritePos[1] *= scale[1];\n  spritePos[0] -= this.radius;\n  spritePos[1] -= this.radius;\n  ctx.save();\n  ctx.scale(scale[0], scale[1]);\n  ctx.drawImage(this.sprite, spritePos[0], spritePos[1], this.radius * 2, this.radius * 2);\n  ctx.restore();\n};\n\nShip.prototype.relocate = function() {\n  this.pos = this.game.randomPosition();\n  this.vel = [0,0];\n  this.prevVel = [-5, -5];\n};\n\nShip.prototype.power = function (impulse) {\n  this.prevVel = Array.from(this.vel);\n  this.vel[0] += impulse[0];\n  this.vel[1] += impulse[1];\n};\n\nShip.prototype.flipScale = function() {\n  const scale = [1,1];\n  if (this.vel[0] > 0) {\n    scale[0] = -1;\n  }\n  if (this.vel[1] > 0) {\n    scale[1] = -1;\n  }\n  if (this.vel[0] === 0 && this.vel[1] === 0) {\n    if (this.prevVel[0] < 0) {\n      scale[0] = -1;\n    }\n    if (this.prevVel[1] < 0) {\n      scale[1] = -1;\n    }\n  }\n  return scale;\n};\n\nShip.prototype.fireBullet = function () {\n  const bulletPos = Array.from(this.pos);\n  const scale = this.flipScale();\n  bulletPos[0] -= this.radius*scale[0];\n  bulletPos[1] -= this.radius*scale[1];\n  \n  let bulletVel = Util.scale(this.vel, 2);\n  if (this.vel[0] === 0 && this.vel[1] === 0) {\n    bulletVel = Util.scale(this.prevVel, -2);\n  }\n\n  const bullet = new Bullet({\n    pos: bulletPos,\n    vel: bulletVel,\n    game: this.game\n  });\n  this.game.bullets.push(bullet);\n};\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  inherits(childClass, parentClass) {\n    function Surrogate() {}\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate();\n    childClass.prototype.constructor = childClass;\n  },\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n  distance(pos1, pos2) {\n    let dx = pos1[0] - pos2[0];\n    let dy = pos1[1] - pos2[1];\n    return Math.sqrt(dx*dx + dy*dy);\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });