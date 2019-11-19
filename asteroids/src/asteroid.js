const Util = require('./utils');
const MovingObject = require('./moving_object');
const Ship = require('./ship'); 
const Bullet = require('./bullet'); 

Asteroid.RADIUS = 20;
Asteroid.COLOR = 'gray';
Asteroid.SPEED = 5;
Asteroid.SPRITE_SRC = '../plankton.png';

function Asteroid(options) {
  MovingObject.call(this, {
    game: options.game,
    pos: options.pos,
    vel: Util.randomVec(Asteroid.SPEED),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR
  });
  this.sprite = new Image();
  this.sprite.src = Asteroid.SPRITE_SRC;
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(this);
    this.game.remove(otherObject);
  }
};

Asteroid.prototype.draw = function (ctx) {
  const spritePos = Array.from(this.pos);
  spritePos[0] -= this.radius;
  spritePos[1] -= this.radius;
  ctx.drawImage(this.sprite, spritePos[0], spritePos[1], this.radius*2, this.radius*2);
};

module.exports = Asteroid;