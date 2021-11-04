// ---- CREATE PLAYER ----- //
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.friction = 0.98;
    this.powerUp = '';
  }

  draw() {
    c.save();
    c.beginPath();
    // c.drawImage(spaceShip, this.x, this.y, 50, 70);
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();
    c.drawImage(game.playerImg, this.x - 51, this.y - 57, 125, 107);
    c.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= this.friction; // adding friction to slow down player movement
    this.velocity.y *= this.friction; //

    // detecting walls
    if (
      this.x - this.radius + this.velocity.x > 0 &&
      this.x + this.radius + this.velocity.x < canvas.width
    ) {
      this.x = this.x + this.velocity.x;
    } else {
      this.velocity.x = 0;
    }
    if (
      this.y - this.radius + this.velocity.y > 0 &&
      this.y + this.radius + this.velocity.y < canvas.height
    ) {
      this.y = this.y + this.velocity.y;
    } else {
      this.velocity.y = 0;
    }
  }

  shoot(mouse, color = 'white') {
    // 1
    const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };
    // creation of projectiles (whenever we click on the screen)
    game.projectiles.push(new Projectile(this.x, this.y, 5, color, velocity));
    shootAudio.cloneNode().play();
  }
}
