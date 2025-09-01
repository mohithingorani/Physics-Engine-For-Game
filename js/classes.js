const gravity = 0.2;
class Sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    framesHold = 10,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.offset = offset;
    this.height = 200;
    this.framesHold = framesHold;
    this.width = 50;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
  }
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }
  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesMax > 0)
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent += 1;
        } else {
          this.framesCurrent = 0;
        }
    }
  }
  update() {
    if (!this.dead) this.animateFrames();
    this.draw();
  }
}
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    offset,
    imgSrc,
    scale = 1,
    framesMax = 1,
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    console.log({
      position,
      imgSrc,
      scale,
      framesMax,
      offset,
    });
    super({
      position,
      imgSrc,
      scale,
      framesMax,
      offset,
    });
    this.framesCurrent = 0;
    this.sprites = sprites;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.velocity = velocity;
    this.height = 200;
    this.width = 50;
    this.dead = false;
    this.health = 100;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
    // console.log(this.sprites);
  }
  // draw() {
  //   c.fillStyle = "red";
  //   c.fillRect(this.position.x, this.position.y, this.width, this.height);

  //   //attack box
  //   if (this.isAttacking) {
  //     c.fillStyle = this.color;
  //     c.fillRect(
  //       this.attackBox.position.x,
  //       this.attackBox.position.y,
  //       this.attackBox.width,
  //       this.attackBox.height
  //     );
  //   }
  // }

  takeHit() {
    this.health -= 5;
    if (this.health <= 0) {
      this.switchSprites("death");
    } else {
      this.switchSprites("takeHit");
    }
  }

  update() {
    this.draw();
    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );
    if(this.position.x+this.velocity.x > 4 && this.position.x+this.velocity.x <935){

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }

    // Gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0;
      // console.log(this.position.y);
      this.position.y = 281;
    } else {
      this.velocity.y += gravity;
    }
  }
  switchSprites(sprite) {
    if (this.image === this.sprites.death.image) {
      if ((this.framesCurrent = this.sprites.death.framesMax - 1)) {
        this.dead = true;
      }
      return;
    }
    if (
      this.image === this.sprites.attack.image &&
      this.framesCurrent < this.sprites.attack.framesMax - 1
    ) {
      return;
    }

    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
          // console.log(this.image);
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
          // console.log(this.image);
        }
        break;
      case "attack":
        if (this.image != this.sprites.attack.image) {
          this.image = this.sprites.attack.image;
          this.framesMax = this.sprites.attack.framesMax;
          this.framesCurrent = 0;
          console.log("attack");
        }
        break;
      case "takeHit":
        if (this.image != this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image != this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }

  attack() {
    this.switchSprites("attack");
    this.isAttacking = true;
  }
}
