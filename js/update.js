/**
 * Main game loop
 */
function update () {
  starfield.tilePosition.y += 1;

  cursors = game.input.keyboard.createCursorKeys();

  // Collisions
  game.physics.arcade.collide(player, dronesGroup, playerCollisionHandler);
  game.physics.arcade.overlap(bullets, dronesGroup, playerBulletHandler, null);

  // Enemy loader
  if (game.time.now > enemySpawnDelay + 1500 && player.configuration.lives > 0) {
    x_position = game.world.width - (game.world.width * Math.random());
    y_position = 0;
    drone = new Drone(game, x_position, y_position, "drone");
    drone.scale.setTo(0.25, 0.25);
    drone.body.velocity.y = drone.configuration.speed;
    new GroupSpriteLoader(game, drone, dronesGroup);

    // Reset spawn timer
    enemySpawnDelay = game.time.now;
  }

  // When player has been destroyed
  if (player.alive === false) {
    playerDeathHandler();
  } else {
    // Initial player velocity state
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    /**
     * Basic Movement
     *
     * Multiple if statements support simultaenous key presses
     */
    if (cursors.left.isDown) {
      player.body.velocity.x = config.player.speed * -1;
    } else if (cursors.right.isDown) {
      player.body.velocity.x = config.player.speed;
    }

    if (cursors.up.isDown) {
      player.body.velocity.y = config.player.speed * -1;
    } else if (cursors.down.isDown) {
      player.body.velocity.y = config.player.speed;
    }

    // Player actions
    // BUG: up+left disallows firing
    if (fireButton.isDown) {
      firePlayerBullet();
    }

    // Ensure that respawn is always set at the end of update loop
    respawnDelay = game.time.now;
  }
}
