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
  this.prevVel = [5, 5];
}

Util.inherits(Ship, MovingObject);

Ship.prototype.draw = function (ctx) {
  
  const spritePos = Array.from(this.pos);
  const scale = this.flipScale();
  spritePos[0] *= scale[0];
  spritePos[1] *= scale[1];
  spritePos[0] -= this.radius;
  spritePos[1] -= this.radius;
  ctx.save();
  ctx.scale(scale[0], scale[1]);
  ctx.drawImage(this.sprite, spritePos[0], spritePos[1], this.radius * 2, this.radius * 2);
  ctx.restore();
};

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
  this.prevVel = [-5, -5];
};

Ship.prototype.power = function (impulse) {
  this.prevVel = Array.from(this.vel);
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.flipScale = function() {
  const scale = [1,1];
  if (this.vel[0] > 0) {
    scale[0] = -1;
  }
  if (this.vel[1] > 0) {
    scale[1] = -1;
  }
  if (this.vel[0] === 0 && this.vel[1] === 0) {
    if (this.prevVel[0] < 0) {
      scale[0] = -1;
    }
    if (this.prevVel[1] < 0) {
      scale[1] = -1;
    }
  }
  return scale;
};

Ship.prototype.fireBullet = function () {
  const bulletPos = Array.from(this.pos);
  const scale = this.flipScale();
  bulletPos[0] -= this.radius*scale[0];
  bulletPos[1] -= this.radius*scale[1];
  
  let bulletVel = Util.scale(this.vel, 2);
  if (this.vel[0] === 0 && this.vel[1] === 0) {
    bulletVel = Util.scale(this.prevVel, -2);
  }

  const bullet = new Bullet({
    pos: bulletPos,
    vel: bulletVel,
    game: this.game
  });
  this.game.bullets.push(bullet);
};

module.exports = Ship;