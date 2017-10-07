class UnimplementedMethodError extends Error {}

class Enemy extends Phaser.Sprite {
  constructor(game, x, y, sprite) {
    super(game);
    this.game = game;

    // Build the sprite based on the string from the constructor
    Phaser.Sprite.call(this, game, x, y, sprite);

    this.defaults();

    // Hook method for overriding default functionality
    this.postConfigurationHook();
  }

  postConfigurationHook() {
    throw new UnimplementedMethodError("must implement method in subclasses");
  }

  // Default enemy settings
  defaults () {
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
  }
}

/**
 * Drone
 *
 * The most basic enemy fighter
 */
class Drone extends Enemy {
  postConfigurationHook() {
    this.configuration = {
      points: 10,
      health: 1,
      speed: 150
    }
  }
}
