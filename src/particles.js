// ---- CREATE PARTICLES (on enemy hit)  ------ //
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1; // 8) Fade out
    this.friction = 0.98;
  }

  draw() {
    c.save(); // save the state
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore(); // restore the state
  }

  // update class properties
  update() {
    this.draw();
    this.velocity.x *= this.friction; // shrinking x & y velocity over time
    this.velocity.y *= this.friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}
