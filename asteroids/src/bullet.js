const Util = require('./utils');
const MovingObject = require('./moving_object');
// const Asteroid = require('./asteroid');

Bullet.RADIUS = 7;
Bullet.COLOR = 'red';
Bullet.SPRITE_SRC = '../blast.png';

function Bullet(options) {
  MovingObject.call(this, {
    game: options.game,
    pos: options.pos,
    vel: options.vel,
    radius: Bullet.RADIUS,
    color: Bullet.COLOR
  });
  this.sprite = new Image();
  this.sprite.src = Bullet.SPRITE_SRC;
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  
  if (this.game.isOutOfBounds(this.pos)) {
    this.game.remove(this);
  }
};

Bullet.prototype.draw = function (ctx) {
  const spritePos = Array.from(this.pos);
  spritePos[0] -= this.radius;
  spritePos[1] -= this.radius;
  ctx.drawImage(this.sprite, spritePos[0], spritePos[1], this.radius * 2, this.radius * 2);
};


Bullet.prototype.collideWith = function (otherObject) {
  // if (otherObject instanceof Asteroid) {
  //   this.game.remove(otherObject);
  //   this.game.remove(this);
  // }
};

module.exports = Bullet;