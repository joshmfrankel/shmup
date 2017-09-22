class UnimplementedMethodError extends Error {}

class Enemy {
  constructor(sprite) {
    this.points = 0; // Default point value
    this.sprite = sprite

    this.postConfigurationHook();
  }

  // get points () {
  //   return this.points;
  // }

  postConfigurationHook () {
    throw new UnimplementedMethodError("must implement method in subclasses");
  }
}

class Drone extends Enemy {
  postConfigurationHook () {
    this.points = 10;
  }
}
