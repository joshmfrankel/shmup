class UnimplementedMethodError extends Error {}

class Enemy extends Phaser.Sprite {
  constructor(game, x, y, sprite) {
    super(game);

    // Build the sprite based on the string from the constructor
    Phaser.Sprite.call(this, game, x, y, sprite);

    // Hook method for overriding default functionality
    this.postConfigurationHook();

    // Default enemy settings
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
  }

  postConfigurationHook() {
    throw new UnimplementedMethodError("must implement method in subclasses");
  }
}

class Drone extends Enemy {
  postConfigurationHook() {
    this.configuration = {
      points: 10,
      health: 1
    }
  }
}
