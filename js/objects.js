class Game {
  constructor(x, y, width, height) {
    this.bg = new Image();
    this.bg.src = "./img/bg-sheet.png";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.score = 0;
  }

  drawBoard() {
    ctx.drawImage(this.bg, 0, 0, this.width, this.height);
  }

  drawFooter() {
    ctx.font = "45px Segoe Script";
    ctx.fillStyle = 'white';
    ctx.fillText(this.score, 25, 680);
    ctx.fillText(`${player.shield}`, 640, 680);
  }
  
  createInvadersGroup(invaderArray) {
    let edge = false;
    
    for(let i = 0; i < invaderArray.length; i++) {
      invaderArray[i].drawInvader();
      invaderArray[i].moveInvader();
      // console.log(`it walks.. ${invaderSteps}`);
      
      if(countFrames % 100 === 0) {
        edge = true;
      }
      // if(invaderArray[i].x > canvas.width - invaderArray[i].width || invaderArray[i].x === 0) {
      //   invaderSteps += 1;
      //   edge = true;
      // }
    }
    if(edge) {
      for(let i = 0; i < invaderArray.length; i++) {
        invaderArray[i].moveDown();
      }
    }
  }

  shotHits(shot, invader) {
    return !(
      shot.bottom() < invader.top() ||
      shot.top() > invader.bottom() ||
      shot.right() < invader.left() ||
      shot.left() > invader.right()
      // invader.bottom() !== canvas.height ||
    )
  }

  playerGetHit(shot) {
    return !(
      player.bottom() < shot.top() ||
      player.top() > shot.bottom() ||
      player.right() < shot.left() ||
      player.left() > shot.right()
    )      
  }

  youWon() {
    ctx.drawImage(this.bg, 0, 0, this.width, this.height);
    ctx.font = "75px Segoe Script";
    ctx.fillStyle = 'black';
    ctx.fillText("YOU ROCK!", canvas.width/5, canvas.height/2);
  }

  gameOver() {
    ctx.drawImage(this.bg, 0, 0, this.width, this.height);
    ctx.font = "75px Segoe Script";
    ctx.fillStyle = 'black';
    ctx.fillText("GAME OVER", canvas.width/8, canvas.height/2);
  }

}

class Player {
  constructor(x, y, width, height) {
    this.playerImg = new Image();
    this.playerImg.src = "./img/player-img.png";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.shield = 0;
    this.speed = 8;
  }

  drawPlayer() {
    ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    if(this.x > 0) {
      this.x -= this.speed;
    }
  }

  moveRight() {
    if(this.x + this.width < canvas.width) {
      this.x += this.speed;
    }
  }

  shoot() {
    const projectile = new Projectile();
    projectile.move();
  }

  bottom() {
    return this.y + this.height;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }
  
  top() {
    return this.y;
  }

  getDamage() {
    this.shield -= 1;
  }

  isDead() {
    if (this.shield < 0) {
      return true;
    } else {
      return false;
    }
  }
}

class Projectile {
  constructor(x, y) {
    this.width = 20;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.speed = 5;
  }

  clearShot(){
    ctx.clearRect(0, 0, ctx.width, ctx.height);
  }

  drawShot() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, 6, 15);
  }

  moveShot() {
    this.drawShot();
    this.y -= 5;
  }

  invaderShoots() {
    this.drawShot();
    this.y += 2;
  }
  
  bottom() {
    return this.y + this.height;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  
  top() {
    return this.y;
  }
}