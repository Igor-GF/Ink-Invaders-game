const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
  
canvas.width = 700;
canvas.height = 700;

let gameMusic = document.createElement('audio');
gameMusic.src = "./sounds/game-music.mp3";
gameMusic.volume = 0.4;

let playerShootsSound = document.createElement('audio');
playerShootsSound.src = './sounds/sound-effect-shot-01.mp3';
playerShootsSound.volume = 0.6;

let invaderShootsSound = document.createElement('audio');
invaderShootsSound.src = './sounds/sound-effect-shot-02.mp3';
invaderShootsSound.volume = 0.5;

let invaderDies = document.createElement('audio');
invaderDies.src = './sounds/grunt.mp3';

let gameOvervoice = document.createElement('audio');
gameOvervoice.src = './sounds/help-us-human.mp3';
gameOvervoice.volume = 0.5;

let youWonMusic = document.createElement('audio');
youWonMusic.src = './sounds/rock-metal.mp3';
youWonMusic.volume = 0.4;

let countFrames = 0;
let gameOver = false;
let newGame = new Game(0, 0, canvas.width, canvas.height);
let player = new Player((canvas.width / 2) - 40, 560, 80, 80);
let invaders = [];
let invadersTwo = [];
let invadersThree = [];
let shots = [];
let invaderShoot = [];

let startButton = document.getElementById('start-game-btn');
startButton.addEventListener('click', () => {
  animate();
  gameMusic.play();
});

for(let i = 0; i < 8; i++) {
  invaders[i] = new Invader(i * 75 + 20, 20, 56, 56);
}

for(let i = 0; i < 8; i++) {
  invadersTwo[i] = new InvaderTwo(i * 75 + 20, 110, 56, 56);
}

for(let i = 0; i < 8; i++) {
  invadersThree[i] = new InvaderThree(i * 75 + 20, 190, 56, 56);
}

function animate() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  newGame.drawBoard();
  newGame.drawFooter();
  player.drawPlayer();
  newGame.createInvadersGroup(invaders);
  newGame.createInvadersGroup(invadersTwo);
  newGame.createInvadersGroup(invadersThree);

  shots.forEach((element) => {
    element.moveShot();
  });
  
  if(countFrames % 120 === 0) {
    let shot = new InvaderProjectile(350, 0);
    invaderShoot.push(shot);
  }

  invaderShoot.forEach((element) => {
    element.moveShot();
  });    
  
  invaders.forEach((enemy, enemyIndex) => {
    shots.forEach((element, index) => {
      if(newGame.shotHits(element, enemy)) {
        newGame.score += 3;
        invaderDies.play();
        shots.splice(index, 1);
        invaders.splice(enemyIndex, 1);
      }
    });
  });
  
  invadersTwo.forEach((enemy, enemyIndex) => {
    shots.forEach((element, index) => {
      if(newGame.shotHits(element, enemy)) {
        newGame.score += 3;
        invaderDies.play();
        shots.splice(index, 1);
        invadersTwo.splice(enemyIndex, 1);
      }
    });
  });

  invadersThree.forEach((enemy, enemyIndex) => {
    shots.forEach((element, index) => {
      if(newGame.shotHits(element, enemy)) {
        newGame.score += 3;
        invaderDies.play();
        shots.splice(index, 1);
        invadersThree.splice(enemyIndex, 1);
      }
    });
  });

  countFrames += 1;

  if(invaders.length == 0 && invadersTwo.length == 0 && invadersThree.length == 0) {
    gameOver = true;
    console.log(`arrays: ${invaders}`);
    console.log(gameOver);
    newGame.youWon();
  }
  
  invaders.forEach((element) => {
    if(element.invadersGetToTheBottom()) {
      newGame.gameOver();
      gameOver = true;
    };
  });

  invadersTwo.forEach((element) => {
    if(element.invadersGetToTheBottom()) {
      newGame.gameOver();
      gameOver = true;
    };
  });

  invadersThree.forEach((element) => {
    if(element.invadersGetToTheBottom()) {
      newGame.gameOver();
      gameOver = true;
    };
  });

  if(!gameOver) requestAnimationFrame(animate);
}

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      player.moveLeft();
      break;

    case "ArrowRight":
      player.moveRight();
      break; 
  }
});

document.addEventListener("click", () => {
  let shot = new Projectile(player.x + player.width/2, player.y);
  shots.push(shot);
  playerShootsSound.play();
});