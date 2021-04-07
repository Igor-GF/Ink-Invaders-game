class Game {
  constructor(x, y, width, height) {
    this.bg = new Image();
    this.bg.src = "./img/bg-sheet.png";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.score = 10;
  }

  drawBoard() {
    ctx.drawImage(this.bg, 0, 0, this.width, this.height);
  }

  drawFooter() {
    ctx.font = "45px Comic Sans MS";
    ctx.fillStyle = 'white';
    ctx.fillText(this.score, 25, 680);
    ctx.fillText(`${player.shield}`, 640, 680);
  }
  
  createInvadersGroup(invaderArray) {
    let edge = false;

    for(let i = 0; i < invaderArray.length; i++) {
      invaderArray[i].drawInvader();
      invaderArray[i].moveInvader();

      if(invaderArray[i].x > canvas.width - invaderArray[i].width || invaderArray[i].x === 0) {
        edge = true;
      }
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
    );

    // if(this.x === invader.x + 28 && this.y === invader.y + invader.height) {
    //   newGame.score += 10;
    //   return true;
    // } else {
    //   return false;
    // }
  }

  gameOver() {
    // if(Player.isDead()) {

    // }
  }

}

class Player {
  constructor(x, y, width, height) {
    this.playerImg = new Image();
    this.playerImg.src = "./img/player-img.png";
    this.width = width;
    this.height = height;
    this.x = x - width;
    this.y = y;
    this.shield = 5;
  }

  drawPlayer() {
    ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    if(this.x > 0) {
      this.x -= 7;
    }
  }

  moveRight() {
    if(this.x + this.width < canvas.width) {
      this.x += 7;
    }
  }

  shoot() {
    const projectile = new Projectile();
    console.log(projectile);
    projectile.move();
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
    // this.img = new Image();
    // this.img.src = './img/enemy-2-img.png';
    this.width = 20;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.speed = 5;
  }

  clearShot(){
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    // this.width = 0;
    // this.height = 0;
  }

  drawShot() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, 6, 15);
  }

  moveShot() {
    this.y -= 2;
  }

  invaderShot() {
    this.y += 2;
  }
  
  bottom() {
    if(this === undefined) {
      return 0;
    } else { 
      return this.y + this.height;
    }
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  
  top() {
    if(this) {
      return this.y;
    } else { 
      return 0;
    }
  }
}