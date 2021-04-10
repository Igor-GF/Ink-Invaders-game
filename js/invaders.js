class Invader {
  constructor(x, y, width, height) {
    this.invaderImg = new Image();
    this.invaderImg.src = "./img/enemy-1-img.png";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xDirection = -1;
    this.speed = 0.5;
  }

  drawInvader() {
    ctx.drawImage(this.invaderImg, this.x, this.y, this.width, this.height);
  }

  moveInvader() {
    this.x += this.xDirection * this.speed;
  }

  moveDown(){
    this.xDirection *= -1;
    this.y += this.height;
  };

  top() {
    return this.y;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  
  bottom() {
    return this.y + this.height;
  }

  invadersGetToTheBottom() {
    if (this.y > player.y) {
      return true;
    } else {
      return false;
    }
  }
}

class InvaderTwo extends Invader {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.invaderImg = new Image();
    this.invaderImg.src = "./img/enemy-2-img.png";
  }
}

class InvaderThree extends Invader {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.invaderImg = new Image();
    this.invaderImg.src = "./img/enemy-3-img.png";
  }
}