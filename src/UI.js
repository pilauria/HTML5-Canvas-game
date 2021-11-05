const game = new Game();

const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const image = new Image();
image.src = 'img/pexels-jo-kassis-5522408.jpg';

image.onload = () => {
  setTimeout(() => {
    c.drawImage(image, 0, 0);
  }, 0);
};

// ---- UI COMPONENTS ---- //
const label = document.querySelector('.sign');
const scoreUI = document.querySelector('#score');
const liveLabel = document.querySelector('#lives');
const btnStart = document.querySelector('.btn-start');
const modalUI = document.querySelector('.container-modal');
const gameOver = document.querySelector('#game-over');
const scoreFinal = document.querySelector('#score-final');
const highScoreBoard = document.querySelector('.highScore');
const audioOffEl = document.querySelector('#audio');
const audioOnEl = document.querySelector('#audioOn');

// ------ SOUND ------- //
const startGameAudio = new Audio(
  'audio/Game Start Sound Effect ► Game Start SFX ► Game Start Sound MP3 _ HD.mp3'
);
const endGameAudio = new Audio('audio/mixkit-falling-game-over-1942.wav');
const shootAudio = new Audio('audio/enemy hit.mp3');
const hitAudio = new Audio('audio/ding.mp3');
const getPowerUpAudio = new Audio('audio/Power Up sound effect.mp3');
const backgroundAudio = new Audio('audio/background.mp3');
const died = new Audio('audio/Roblox Death Sound Effect.mp3');
backgroundAudio.loop = true; // to loop the music over whenever ends
backgroundAudio.volume = 0.4;
highScoreBoard.textContent = `High Score: ${game.highScore}`;

// ---- create projectiles: automatic shooting (power-up) ---- //
addEventListener('mousedown', ({ clientX, clientY }) => {
  game.mouse.x = clientX;
  game.mouse.y = clientY;
  game.mouse.down = true;
});

addEventListener('mousemove', ({ clientX, clientY }) => {
  game.mouse.x = clientX;
  game.mouse.y = clientY;
});

addEventListener('mouseup', () => {
  game.mouse.down = false;
});

// ---- create projectiles: on click (normal shooting) ---- //
// 2)
addEventListener('click', ({ clientX, clientY }) => {
  if (game.powerUp !== 'Automatic') {
    // 14) +
    // set the game.mouse x and y proprierties = wherever we click on the screen
    game.mouse.x = clientX;
    game.mouse.y = clientY;
    // the player is created globally, no need to pass it here as an argument
    game.player.shoot(game.mouse);
  }
});

// resizing the screen without refreshing the browser
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  game.init();
});

// -------- START GAME -------- //
btnStart.addEventListener('click', () => {
  game.init();
  game.animate();
  game.spawnEnemies();
  game.spawnPowerUps();
  startGameAudio.play();
  backgroundAudio.play();
  // side images disappear on start
  [].forEach.call(document.querySelectorAll('.rotate'), function (el) {
    el.style.display = 'none';
  });
  label.style.display = 'none';

  gsap.to('#whiteModal', {
    opacity: 0,
    scale: 0.75,
    ease: 'expo.in',
    duration: 0.5,
    onComplete: () => {
      modalUI.style.display = 'none';
    },
  });
});

// ---- PLAYER MOVEMENTS ------- //
addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 69:
      game.player.velocity.y -= 1;
      break;
    case 83:
      game.player.velocity.x -= 1;
      break;
    case 68:
      game.player.velocity.y += 1;
      break;
    case 70:
      game.player.velocity.x += 1;
      break;
  }
});

// -------- SOUND OFF/ON --------- //
audioOffEl.addEventListener('click', () => {
  backgroundAudio.volume = 0;
  audioOnEl.style.display = 'block';
  audioOffEl.style.display = 'none';
});

audioOnEl.addEventListener('click', () => {
  backgroundAudio.volume = 0.2;
  audioOnEl.style.display = 'none';
  audioOffEl.style.display = 'block';
});
