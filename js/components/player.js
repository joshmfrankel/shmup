function createPlayer() {
  // Sprites
  player = game.add.sprite(game.world.width / 2, game.world.height / 2, "player");
  player.tint = Math.random() * 0xffffff;
  // Set player configurations
  // TODO: Override for difficulty level
  player.configuration = config.player;

  // Scale the player ship to 1/4 scale from original image
  player.scale.setTo(0.25, 0.25);
  // TODO: 100x100 doesn't work
  player_box_size = {
    width: 75,
    height: 75
  }
  player_box_x = (player.width / 2) - ((player.width / 2) - (player_box_size.width / 2));
  player_box_y = (player.height / 2) + ((player.height / 2) - (player_box_size.height / 2));
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.setSize(player_box_size.width, player_box_size.height, player_box_x, player_box_y);

  player.body.collideWorldBounds = true;
}

function playerCollisionHandler (player, colliding_object) {

  // Ensure only 1 life is lost
  if (game.time.now > collisionDelay) {
    player.kill();
    colliding_object.kill();
    // TODO: Trigger explosion on enemy
    // TODO: Trigger explosion on player
    player.configuration.lives--;

    textElement.text = textUpdate();
    collisionDelay = game.time.now
  }
}

function playerBulletHandler (bullet, enemy) {
  bullet.kill();
  enemy.kill(); // TODO: Kill if health is 0

  // TODO: Trigger explosion on enemy
  score += enemy.configuration.points;
  textElement.text = textUpdate();
}

function playerDeathHandler () {
  // TODO: Blinking for 3 seconds at bottom of screen (invulernable)
  if (player.configuration.lives > 0) {

    if (game.time.now > respawnDelay + 500) {

      createPlayer();
      player.tint = Math.random() * 0xffffff;
    }
  } else {
    // Gameover
    eventTextUpdateElement.text = "GAME OVER!";

    // TODO: Fade in over 2 seconds
  }
}

function firePlayerBullet () {

  if (game.time.now > bulletFireDelay) {
    bullet = bullets.getFirstExists(false);

    if (bullet) {
      bullet.reset(player.x + 33, player.y - 25);
      bullet.body.velocity.y = config.player.bullet.velocity * -1;

      bulletFireDelay = game.time.now + config.player.bullet.rateOfFire;
    }
  }
}
