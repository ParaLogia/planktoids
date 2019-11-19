const Util = require('./utils');
const MovingObject = require('./moving_object');
const Bullet = require('./bullet');
// const Asteroid = require('./asteroid');

Ship.RADIUS = 15;
Ship.COLOR = 'yellow';
Ship.START_VEL = [0, 0];

function Ship(options) {
  MovingObject.call(this, {
    game: options.game,
    pos: options.pos,
    vel: Ship.START_VEL,
    radius: Ship.RADIUS,
    color: Ship.COLOR
  });
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  if (this.vel[0] === 0 && this.vel[1] === 0) return;

  const bulletPos = Array.from(this.pos);
  const bulletVel = Util.scale(this.vel, 2);
  const bullet = new Bullet({
    pos: bulletPos,
    vel: bulletVel,
    game: this.game
  });
  // console.log(Asteroid);
  // console.log(bullet instanceof Ship);
  this.game.bullets.push(bullet);
};

module.exports = Ship;