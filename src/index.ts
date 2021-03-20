const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

canvas.width = 800;
canvas.height = 500;

const keys: string[] = [];

interface Animated {
  sprite: CanvasImageSource;
  frameX: number;
  frameY: number;
  changeSpriteFrame(): void;
}

interface Moveable {
  speed: number;
  moving: boolean;
  move(): void;
}

interface Character extends Animated, Moveable {
  x: number;
  y: number;
  width: number;
  height: number;
}

class Player implements Character {
  sprite: CanvasImageSource;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    src: string,
    public frameX: number,
    public frameY: number,
    public speed: number,
    public moving: boolean,
  ) {
    this.sprite = new Image();
    this.sprite.src = src;
  }

  changeSpriteFrame() {
    if (this.frameX < 3 && this.moving) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  move() {
    this.moving = false;
    if (keys.includes('ArrowUp') && this.y >= this.speed) {
      this.y -= this.speed;
      this.frameY = 3;
      this.moving = true;
    }
    if (
      keys.includes('ArrowDown') &&
      this.y + this.height <= canvas.height - this.speed
    ) {
      this.y += this.speed;
      this.frameY = 0;
      this.moving = true;
    }
    if (keys.includes('ArrowLeft') && this.x >= this.speed) {
      this.x -= this.speed;
      this.frameY = 1;
      this.moving = true;
    }
    if (
      keys.includes('ArrowRight') &&
      this.x + this.width <= canvas.width - this.speed
    ) {
      this.x += this.speed;
      this.frameY = 2;
      this.moving = true;
    }
  }

  draw() {
    this.move();
    this.changeSpriteFrame();
    ctx.drawImage(
      this.sprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

const player = new Player(
  0,
  0,
  32,
  48,
  './images/darthvader.png',
  0,
  0,
  10,
  false,
);

window.addEventListener('keydown', event => {
  if (!keys.includes(event.key)) keys.push(event.key);
});

window.addEventListener('keyup', event => {
  keys.splice(keys.indexOf(event.key), 1);
});

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
};

let fpsInterval: number, startTime: number, now: number, then: number;

const animationFrame = () => {
  requestAnimationFrame(animationFrame);
  now = new Date().getTime();
  const elapsed: number = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    animate();
  }
};

const startAnimating = (fps: number) => {
  fpsInterval = 1000 / fps;
  then = new Date().getTime();
  startTime = then;
  animationFrame();
};

startAnimating(10);
