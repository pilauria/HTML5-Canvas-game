class Game {
  constructor() {
    // ----  VARIABLES INITIALIZATION ------ //
    // initialize 'scene' variable to deactivate the screen on game over (no click)
    //  insert player image
    this.playerImg = new Image();
    this.playerImg.src = 'img/spaceship-g0ddc90c0d_1920.png';
    // insert powerUp image
    this.powerUpImg = new Image();
    this.powerUpImg.src = 'img/power-up.png';
    this.player = null;
    // INITIALIZE ARRAYS FOR STORAGE OF MULTIPLE OBJECTS (manage multiple instances of the same object with arrays)
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.powerUps = [];
    this.animationId = null;
    this.score = 0;
    this.highScore = localStorage.getItem('highScore') || 0;
    // this.highScore = localStorage.getItem('game1HighScore') || "0";
    this.frame = 0; // initiate this variable to control the frequency of the shooting during the powerUp
    this.lives = 0;
    this.mouse = {
      down: false,
      x: undefined,
      y: undefined,
    };
    this.friction = 0.98;
  }
  // ------ RESET GAME ------ //
  init() {
    // init the starting player position
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    // ---- instantiate  a new Player
    this.player = new Player(x, y, 40, '#fff');
    this.powerUps = [];
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.lives = 2;
    liveLabel.innerHTML = this.lives;
    scoreUI.innerHTML = this.score;
    scoreFinal.innerHTML = this.score;
    this.checkHighScore();
    highScoreBoard.textContent = `High Score: ${this.highScore}`;
  }

  checkHighScore() {
    if (this.highScore < this.score) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.score);
      highScoreBoard.textContent = `High Score: ${this.score}`;
    }
  }

  // ------ GENERATE RANDOM this.ENEMIES ------ //
  spawnEnemies() {
    // generate one enemy each 2000 millisecs
    setInterval(() => {
      // create random size for the enemy (range btw 5 & 34)
      const radius = Math.floor(Math.random() * (34 - 5)) + 5;
      let x;
      let y;
      // 50/50 probab to have random this.enemies from left/right(50%)(if) - top/bottom(50%)(else)
      if (Math.random() < 0.5) {
        // 50/50 chance to have enemy from left or right of the canvas
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
        //   y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      } else {
        // 50/50 chance to have enemy from top or bottom of the canvas
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      }
      //randomize enemy colors
      const color = `hsl(${Math.random() * 360}, 50%,50%)`;
      // move them (give angle and velocity)
      const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      this.enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 2000);
  }

  // ------ GENERATE RANDOM POWERUPS ------ //
  spawnPowerUps() {
    this.width = 20;
    this.height = 20;
    // generate one powerUp every 7000 millisecs
    setInterval(() => {
      let x;
      let y;
      // 50/50 probab to have random this.powerUps from left/right(50%)(if) - top/bottom(50%)(else)
      if (Math.random() < 0.5) {
        // 50/50 chance to have them from left or right of the canvas
        x =
          Math.random() < 0.5
            ? 0 - this.width / 2
            : canvas.width + this.width / 2; // 13)
        y = Math.random() * canvas.height;
        //   y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      } else {
        // 50/50 chance to have then from top or bottom of the canvas
        x = Math.random() * canvas.width;
        y =
          Math.random() < 0.5
            ? 0 - this.height / 2
            : canvas.width + this.height / 2;
      }
      // powerUp movement (toward the center as the linear this.Enemies)
      const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      this.powerUps.push(new PowerUp(x, y, velocity));
    }, 7000);
  }

  // ----- PRINT 'SCORE' LABEL ON ENEMY HIT ---- //
  createScoreLabel(projectile, score) {
    const scoreLabel = document.createElement('label');
    scoreLabel.innerHTML = score;
    scoreLabel.style.position = 'absolute';
    scoreLabel.style.color = 'white';
    scoreLabel.style.fontFamily = 'DM Mono';
    scoreLabel.style.fontSize = '2.5rem';
    scoreLabel.style.userSelect = 'none';
    scoreLabel.style.left = `${projectile.x}px`;
    scoreLabel.style.top = `${projectile.y}px`;
    document.body.appendChild(scoreLabel);
    // Remove this.score from sceen and DOM after hit
    gsap.to(scoreLabel, {
      // fading out this.score on screen
      opacity: 0,
      y: -50,
      duration: 3,
      // remove the labels(score) from the DOM
      onComplete: () => {
        scoreLabel.parentNode.removeChild(scoreLabel);
      },
    });
  }

  // ----- PRINT 'POWERUP' LABEL ON PLAYER HIT ---- //
  printPowerUpLabel() {
    const powerUpLabel = document.createElement('label');
    powerUpLabel.innerHTML = 'POWER UP!';
    powerUpLabel.style.position = 'absolute';
    powerUpLabel.style.color = 'yellow';
    powerUpLabel.style.fontFamily = 'DM Mono';
    powerUpLabel.style.fontSize = '2.8rem';
    powerUpLabel.style.userSelect = 'none';
    powerUpLabel.style.left = `${this.player.x}px`;
    powerUpLabel.style.top = `${this.player.y}px`;
    document.body.appendChild(powerUpLabel);
    // Remove this.score from sceen and DOM after hit
    gsap.to(powerUpLabel, {
      // fading out this.score on screen
      opacity: 0,
      y: -40,
      duration: 5.25,
      // remove the labels(score) from the DOM
      onComplete: () => {
        powerUpLabel.parentNode.removeChild(powerUpLabel);
      },
    });
  }

  // ------ ANIMATE GAME ------ //
  //(render every element on the screen (looping over them)) ----- //
  animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.frame++;
    c.drawImage(image, 0, 0);
    this.player.update();

    // fade out and remotion of the this.particles after hit
    this.particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        // remotion
        this.particles.splice(index, 1);
      } else {
        // fade out (decrease alpha)
        particle.update();
      }
    });

    if (this.player.powerUp === 'Automatic' && this.mouse.down) {
      // shoot ever 6 frame of the game, with red color
      if (this.frame % 6 === 0) {
        this.player.shoot(this.mouse, 'red');
      }
    }

    // this.powerUps creation on screen / collision detection( player/powerUp)
    this.powerUps.forEach((powerUp, index) => {
      const dist = Math.hypot(
        this.player.x - powerUp.x,
        this.player.y - powerUp.y
      );
      // get powerUp / gain the automatic shootin ability
      if (dist - this.player.radius - powerUp.width / 2 < 1) {
        this.player.powerUp = 'Automatic';
        this.printPowerUpLabel();
        //remove the powerUp from the screen on touch (remove from this.powerUps array)
        this.powerUps.splice(index, 1);
        getPowerUpAudio.cloneNode().play();
        // remove the powerUp after 7 seconds
        setTimeout(() => {
          this.player.powerUp = null;
        }, 7000);
      } else {
        powerUp.update();
      }
    });

    // drawing projectiles
    this.projectiles.forEach((projectile, index) => {
      projectile.update();
      // remove projectiles from edges of screen (when they hit the screen). if(left || right || top || bottom)
      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        // 4)
        setTimeout(() => {
          this.projectiles.splice(index, 1);
        }, 0);
      }
    });

    // 3) drawing enemy (forEach) / collision detection / game over
    this.enemies.forEach((enemy, index) => {
      enemy.update();
      // collision detection (hit)
      // -- for player - enemy:
      const dist = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
      // !!! REMOVE LIVES
      if (dist - enemy.radius - this.player.radius < 1) {
        if (this.lives > 0 && enemy.deadly) {
          enemy.deadly = false;
          this.enemies.splice(index, 1);
          died.play();
          this.lives -= 1;
          liveLabel.innerHTML = this.lives;
        } else if (this.lives === 0) {
          // GAME OVER (freeze) !!!
          cancelAnimationFrame(this.animationId);
          modalUI.style.display = 'flex';
          scoreFinal.innerHTML = this.score.toLocaleString();
          endGameAudio.play();
          backgroundAudio.pause();
          this.checkHighScore();
          gameOver.style.display = 'block';
          // side images disappear on start
          [].forEach.call(document.querySelectorAll('.rotate'), function (el) {
            el.style.display = 'block';
          });
          setTimeout(() => {
            gameOver.style.display = 'none';
            label.style.display = 'flex';
          }, 6000);

          gsap.to('#whiteModal', {
            opacity: 1,
            scale: 1,
            ease: 'expo',
            duration: 5.75,
          });
        }
      }
      // -- for enemy-projectile:
      this.projectiles.forEach((projectile, projectileIndex) => {
        //calculate the distance between projectile and enemy
        // -- dist is the center of the two object (then we need take also into consideration the radius of the two):
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
        // when projectiles touch enemy
        if (dist - enemy.radius - projectile.radius < 0.25) {
          // 7) create explosion
          for (let i = 0; i < enemy.radius * 5; i++) {
            this.particles.push(
              new Particle(
                projectile.x,
                projectile.y,
                Math.random() * 2,
                enemy.color,
                {
                  // 9)
                  x: (Math.random() - 0.5) * Math.random() * 8, // random value (positive or negative)
                  y: (Math.random() - 0.5) * Math.random() * 8,
                }
              )
            );
          }
          // 6)
          if (enemy.radius - 10 > 5) {
            // increase this.score on shrink
            this.score += 150; // just 100 on shrink (enemy still on scene)
            scoreUI.innerHTML = this.score.toLocaleString();
            // print this.score in DOM (on shrink)
            this.createScoreLabel(projectile, 150);
            // using gsap to interpolate (smooth render) between sizes after hit (projectile-enemy)
            gsap.to(enemy, {
              radius: enemy.radius - 10,
            });

            setTimeout(() => {
              this.projectiles.splice(projectileIndex, 1);
            }, 0);
          } else {
            // remove from scene altogether that enemy and that projectile (1 unit each) from that specifing point (of the array)
            hitAudio.cloneNode().play();
            this.score += 300; // 300 on remove from scene
            scoreUI.innerHTML = this.score.toLocaleString();
            this.createScoreLabel(projectile, 300);
            // 4
            setTimeout(() => {
              this.enemies.splice(index, 1);
              this.projectiles.splice(projectileIndex, 1);
            }, 0);
          }
        }
      });
    });
  };
}
