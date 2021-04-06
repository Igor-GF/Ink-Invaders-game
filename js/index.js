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
let shots = [];

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
  
  for(let i = 0; i < shots.length; i++) {
    shots[i].drawShot();
    shots[i].moveShot();
    for(let j = 0; j < invaders.length; j++) {
      if(shots[i].shotHits(invaders[j])) {
          // shots[i].splice(i, 1);
          // invaders[j].splice(i, 1);
          console.log("It hit");
        }
        
      }
    }

  for(let i = 0; i < invaders.length; i++) {
    invaders[i].drawInvader();
  }
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
      let shot = new Projectile(player.x + player.width/2, 550);
      shots.push(shot);
      break; 
  }
});