const Util = require('./utils');
const MovingObject = require('./moving_object');
const Ship = require('./ship'); 
const Bullet = require('./bullet'); 

Asteroid.RADIUS = 20;
Asteroid.COLOR = 'gray';
Asteroid.SPEED = 5;

function Asteroid(options) {
  MovingObject.call(this, {
    game: options.game,
    pos: options.pos,
    vel: Util.randomVec(Asteroid.SPEED),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR
  });
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

module.exports = Asteroid;