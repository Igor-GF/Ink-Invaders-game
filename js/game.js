const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
  
canvas.width = 700;
canvas.height = 700;
 
let startButton = document.getElementById('start-game-btn');
startButton.addEventListener('click', () => {
  // startGame();
  animate();
});

let countFrames = 0;
let newGame = new Game(0, 0, canvas.width, canvas.height);
let player = new Player(canvas.width / 2 - 40, 560, 80, 80);
let invaders = [];
let invadersTwo = [];
let invadersThree = [];
let shots = [];
let invaderShoot = [];

for(let i = 0; i < 8; i++) {
  invaders[i] = new Invader(i * 75 + 20, 20, 56, 56);
}

for(let i = 0; i < 8; i++) {
  invadersTwo[i] = new InvaderTwo(i * 75 + 20, 110, 56, 56);
}

for(let i = 0; i < 8; i++) {
  invadersThree[i] = new InvaderThree(i * 75 + 20, 190, 56, 56);
}

// function startGame() {
//   setInterval(animate, 20);
// }

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  newGame.drawBoard();
  newGame.drawFooter();
  player.drawPlayer();
  newGame.createInvadersGroup(invaders);
  newGame.createInvadersGroup(invadersTwo);
  newGame.createInvadersGroup(invadersThree);

  for(let i = 0; i < shots.length; i++) {
    shots[i].drawShot();
    shots[i].moveShot();
    for(let j = 0; j < invaders.length; j++) {
      if(newGame.shotHits(shots[i], invaders[j])) {
        console.log(shots[i]);
        shots.splice(i, 1);
        invaders.splice(j, 1);
        // console.log("It hit");
      }
    }
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
      let shot = new Projectile(player.x + player.width/2, player.y);
      shots.push(shot);
      break; 
  }
});