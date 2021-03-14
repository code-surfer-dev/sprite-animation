const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

canvas.width = 800;
canvas.height = 500;

const keys: string[] = [];

const player = {
  x: 0,
  y: 0,
  width: 32,
  height: 48,
  //   width: 50,
  //   height: 48,
  frameX: 0,
  frameY: 0,
  speed: 10,
  moving: false,
};

const playerSprite = new Image();
playerSprite.src = './images/darthvader.png';

const drawSprite = (
  img: CanvasImageSource,
  sX: number,
  sY: number,
  sW: number,
  sH: number,
  dX: number,
  dY: number,
  dW: number,
  dH: number,
) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

const movePlayer = () => {
  if (keys['ArrowUp'] && player.y >= player.speed) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (
    keys['ArrowDown'] &&
    player.y + player.height <= canvas.height - player.speed
  ) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys['ArrowLeft'] && player.x >= player.speed) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (
    keys['ArrowRight'] &&
    player.x + player.width <= canvas.width - player.speed
  ) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
};

const changeSpriteFrame = () => {
  if (player.frameX < 3 && player.moving) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
};

window.addEventListener('keydown', event => {
  keys[event.key] = true;
});

window.addEventListener('keyup', event => {
  delete keys[event.key];
  player.moving = false;
});

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSprite(
    playerSprite,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width * 2,
    player.height * 2,
  );
  movePlayer();
  changeSpriteFrame();
};

let fps, fpsInterval, startTime, now, then, elapsed;

const startAnimating = fps => {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animationFrame();
};

const animationFrame = () => {
  requestAnimationFrame(animationFrame);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    animate();
  }
};

startAnimating(10);
