// ---- CREATE POWER-UP ---- //

class PowerUp {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = 20;
    this.height = 20;
    this.radians = 0;
  }

  draw() {
    // 15)
    c.save();
    c.translate(this.x + this.width / 2, this.y + this.height / 2);
    c.rotate(this.radians);
    c.translate(-this.x - this.width / 2, -this.y - this.height / 2); // 15)a
    c.drawImage(game.powerUpImg, this.x, this.y, 25, 25);
    c.restore();
  }

  // update class properties
  update() {
    this.radians += 0.007;
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
