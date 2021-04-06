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
    this.x = x - width/2;
    this.y = y;
    this.shield = 0;
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

class Invader {
  constructor(x, y, width, height) {
    this.invaderImg = new Image();
    this.invaderImg.src = "./img/enemy-1-img.png";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawInvader() {
    ctx.drawImage(this.invaderImg, this.x, this.y, this.width, this.height);
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveInvader() {

  }

  shootInvader() {

  }

  isInvaderDead() {

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
    // this.x = player.x + (player.width / 2);
    // this.y = player.y;
    this.speed = 5;
  }

  drawShot() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath;
  }

  moveShot() {
    // this.drawing();
    this.y -= 5;
  }

  move(){
    this.y -= this.speed;
  }
}