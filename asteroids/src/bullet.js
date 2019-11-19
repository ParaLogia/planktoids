const Util = require('./utils');
const MovingObject = require('./moving_object');
// const Asteroid = require('./asteroid');

Bullet.RADIUS = 3;
Bullet.COLOR = 'red';

function Bullet(options) {
  MovingObject.call(this, {
    game: options.game,
    pos: options.pos,
    vel: options.vel,
    radius: Bullet.RADIUS,
    color: Bullet.COLOR
  });
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  
  if (this.game.isOutOfBounds(this.pos)) {
    this.game.remove(this);
  }
};


Bullet.prototype.collideWith = function (otherObject) {
  // if (otherObject instanceof Asteroid) {
  //   this.game.remove(otherObject);
  //   this.game.remove(this);
  // }
};

module.exports = Bullet;