const Util = require('./utils');
const MovingObject = require('./moving_object');
const Bullet = require('./bullet');
// const Asteroid = require('./asteroid');

Ship.RADIUS = 30;
Ship.COLOR = 'yellow';
Ship.START_VEL = [0, 0];
Ship.SPRITE_SRC = '../drix.png'; 

function Ship(options) {
  MovingObject.call(this, {
    game: options.game,
    pos: options.pos,
    vel: Ship.START_VEL,
    radius: Ship.RADIUS,
    color: Ship.COLOR
  });

  this.sprite = new Image();
  this.sprite.src = Ship.SPRITE_SRC;
}

Util.inherits(Ship, MovingObject);

Ship.prototype.draw = function (ctx) {
  
  const spritePos = Array.from(this.pos);
  spritePos[0] -= this.radius;
  spritePos[1] -= this.radius;
  ctx.translate(spritePos[0], spritePos[1]);
  ctx.rotate(this.angle());
  ctx.drawImage(this.sprite, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
  ctx.rotate(-this.angle());
  ctx.translate(-spritePos[0], -spritePos[1]);
};

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.angle = function() {
  return Math.atan2(this.vel[1], this.vel[0]);
};

Ship.prototype.fireBullet = function () {
  if (this.vel[0] === 0 && this.vel[1] === 0) return;

  const bulletPos = Array.from(this.pos);
  bulletPos[0] -= this.radius;
  bulletPos[1] -= this.radius;
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