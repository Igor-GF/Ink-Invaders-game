const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
  
canvas.width = 700;
canvas.height = 700;
 
let startButton = document.getElementById('start-game-btn');
startButton.addEventListener('click', () => {
  startGame();
});

let newGame = new Game(0, 0, canvas.width, canvas.height);
let player = new Player(canvas.width / 2, 550, 80, 80);
let invaders = [];
let bullet = new Projectile(canvas.width / 2, canvas.height / 2);

for(let i = 0; i < 8; i++) {
  invaders[i] = new Invader(i * 75 + 20, 50, 56, 56);
}

function startGame() {
  setInterval(animate, 20);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  newGame.drawBoard();
  player.drawPlayer();  
  for(let i = 0; i < invaders.length; i++) {
    invaders[i].drawInvader();
  }
  bullet.drawShot();
  bullet.moveShot();
  // invaders.drawInvader();
}

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      player.moveLeft();
      break;

    case "ArrowRight":
      player.moveRight();
      break; 

    case "Space":
      player.shoot();
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      break; 
  }
});