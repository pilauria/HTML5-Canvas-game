// ----CREATE ENEMY ---- //
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.type = 'linear'; // 11) normal/linear enemy => moves toward the center
    this.center = {
      x,
      y,
    };
    this.radians = 0;
    // 11a) homing enemy type
    if (Math.random() < 0.25) {
      this.type = 'homing';
      if (Math.random() < 0.5) {
        this.type = 'spinning';
      }
    }
    this.deadly = true;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  // update class properties (how the enemy move)
  update() {
    this.draw();
    if (this.type === 'linear') {
      // linear movements
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
    } else if (this.type === 'homing') {
      // 10)  homing movements
      const angle = Math.atan2(game.player.y - this.y, game.player.x - this.x);
      // 10)a
      // console.log(angle);
      this.velocity = {
        x: Math.cos(angle), // enemy 'x' velocity
        y: Math.sin(angle),
      };
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
    } else if ((this.type = 'spinning')) {
      this.radians += 0.06;
      // 12)
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
      // 12a) Spinning effect
      this.x = this.center.x + Math.cos(this.radians) * 70;
      this.y = this.center.y + Math.sin(this.radians) * 70;
    }
  }
}
