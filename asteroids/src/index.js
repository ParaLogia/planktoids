const Game = require("./game");
const GameView = require("./game_view");

// window.MovingObject = MovingObject;
// window.Asteroid = Asteroid;

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  const game = new Game();
  const gameView = new GameView(game, ctx);

  gameView.start();

  // game.draw(ctx);
  window.ctx = ctx;
  window.game = game;
});
