class Invader {
  constructor(x, y, width, height) {
    this.invaderImg = new Image();
    this.invaderImg.src = "./img/enemy-1-img.png";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xDirection = -1;
  }

  drawInvader() {
    ctx.drawImage(this.invaderImg, this.x, this.y, this.width, this.height);
  }

  moveInvader() {
    this.x = this.x + this.xDirection;
  }

  moveDown(){
    this.xDirection *= -1;
    this.y += this.height;
  };

  shootInvader() {

  }

  top() {
    if (this) {
      return this.y;
    } else {
      return 0;
    }
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  
  bottom() {
    if (this) {
      return this.y + this.height;
    } else {
      return 0;
    }
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