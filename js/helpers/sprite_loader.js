/**
 * Load sprites to the game world and add them to a group
 */
class GroupSpriteLoader {
  constructor (game, sprite, group) {
    game.add.existing(sprite);
    group.add(sprite);
  }
}
