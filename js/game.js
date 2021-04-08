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
let gameOver = false;
let newGame = new Game(0, 0, canvas.width, canvas.height);
let player = new Player((canvas.width / 2) - 40, 560, 80, 80);
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

  // if(countFrames % 500 === 0) {
  //   let shot = new Projectile(350, 0);
  //   invaderShoot.push(shot);
  //   invaderShoot.forEach((element) => {
  //     element.invaderShoots();
  //   })
  // }
  
  invaders.forEach((enemy, enemyIndex) => {
    shots.forEach((element, index) => {
      if(newGame.shotHits(element, enemy)) {
        newGame.score += 3;
        // console.log(shots[index]);
        shots.splice(index, 1);
        invaders.splice(enemyIndex, 1);
        // console.log("It hit");
      }
    });
  });
  
  invadersTwo.forEach((enemy, enemyIndex) => {
    shots.forEach((element, index) => {
      if(newGame.shotHits(element, enemy)) {
        newGame.score += 3;
        // console.log(shots[index]);
        shots.splice(index, 1);
        invadersTwo.splice(enemyIndex, 1);
        // console.log("It hit");
      }
    });
  });

  invadersThree.forEach((enemy, enemyIndex) => {
    shots.forEach((element, index) => {
      if(newGame.shotHits(element, enemy)) {
        newGame.score += 3;
        // console.log(shots[index]);
        shots.splice(index, 1);
        invadersThree.splice(enemyIndex, 1);
        // console.log("It hit");
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

    // case "Space":
    //   let shot = new Projectile(player.x + player.width/2, player.y);
    //   shots.push(shot);
    //   break; 
  }
});

document.addEventListener("click", () => {
  let shot = new Projectile(player.x + player.width/2, player.y);
  shots.push(shot);
});