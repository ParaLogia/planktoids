function GameView (game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  const that = this;
  
  this.bindKeyHandlers();

  setInterval(function () {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  const that = this;

  key('w', function() {
    that.game.ship.power([0, -5]);
  });
  key('a', function () {
    that.game.ship.power([-5, 0]);
  });
  key('s', function () {
    that.game.ship.power([0, 5]);
  });
  key('d', function () {
    that.game.ship.power([5, 0]);
  });
  key('space', function () {
    that.game.ship.fireBullet();
  });
};

module.exports = GameView;