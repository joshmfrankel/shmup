function create() {
  // Game Configuration
  game.physics.startSystem(Phaser.Physics.ARCADE);

  starfield = game.add.tileSprite(0, 0, 800, 900, 'starfield');

  // Controls
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  createPlayer();

  // Middle text
  eventTextUpdateElement = game.add.text(
    game.world.centerX,
    game.world.centerY,
    "",
    {
      fill: "#fff",
      font: "34px Arial",
    });
  eventTextUpdateElement.anchor.setTo(0.5, 0.5); // Set element origin to center
  eventTextUpdateElement.alpha = 0.1;

  // Bullets
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, "bullet");
  bullets.setAll("outOfBoundsKill", true);
  bullets.setAll("checkWorldBounds", true);

  // Drones
  dronesGroup = game.add.group();
  dronesGroup.enableBody = true;
  dronesGroup.physicsBodyType = Phaser.Physics.ARCADE;
  dronesGroup.setAll("outOfBoundsKill", true);
  dronesGroup.setAll("checkWorldBounds", true);

  // Stars
  new Phaser.Circle(game.world.centerX, 100,64);

  textElement = game.add.text(
    10,
    10,
    textUpdate(),
    {
      fill: "#fff",
      font: "34px Arial",
    }
  );
}
