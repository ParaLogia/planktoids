const Asteroid = require('./asteroid');
const Ship = require('./ship');

// Consider switching this for canvas size
Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;
Game.BACKGROUND_SRC = '../bacteria.jpg';

function Game() {
  this.asteroids = [];
  this.bullets = [];

  this.addAsteroids();

  this.ship = new Ship({ 
    pos: this.randomPosition(),
    game: this
  });

  this.bg = new Image();
  this.bg.src = Game.BACKGROUND_SRC;
}

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.bullets).concat([this.ship]);
};

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let ast = new Asteroid({
      pos: this.randomPosition(),
      game: this
    });
    this.asteroids.push(ast);
  }
};
 
Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X,
          Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  // ctx.fillStyle = 'green';
  // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(this.bg, 0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(obj => obj.draw(ctx));
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(asteroid => asteroid.move());
};

Game.prototype.wrap = function (pos) {
  return [
    (pos[0] + Game.DIM_X) % Game.DIM_X,
    (pos[1] + Game.DIM_Y) % Game.DIM_Y
  ];
};

Game.prototype.checkCollisions = function () {
  const allObj = this.allObjects();

  for (let i = 0; i < allObj.length; i++) {
    for (let j = i+1; j < allObj.length; j++) {
      if (allObj[i].isCollidedWith(allObj[j])) {
        let obj1 = allObj[i];
        let obj2 = allObj[j];
        obj1.collideWith(obj2);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(object) {
  // this.asteroids = this.asteroids.filter((obj) => obj !== object);
  if (object instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  } else {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  }
};

Game.prototype.isOutOfBounds = function(pos) {
  return ((pos[0] < 0 || pos[0] > Game.DIM_X) ||
          (pos[1] < 0 || pos[1] > Game.DIM_Y));
};

module.exports = Game;