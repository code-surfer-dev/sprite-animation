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
  if ('ArrowUp' in keys && player.y >= player.speed) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (
    'ArrowDown' in keys &&
    player.y + player.height <= canvas.height - player.speed
  ) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if ('ArrowLeft' in keys && player.x >= player.speed) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (
    'ArrowRight' in keys &&
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
  keys.push(event.key);
});

window.addEventListener('keyup', event => {
  keys.splice(keys.indexOf(event.key), 1);
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

let fpsInterval: number, startTime: number, now: number, then: number;

const startAnimating = (fps: number) => {
  fpsInterval = 1000 / fps;
  then = new Date().getTime();
  startTime = then;
  animationFrame();
};

const animationFrame = () => {
  requestAnimationFrame(animationFrame);
  now = new Date().getTime();
  const elapsed: number = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    animate();
  }
};

startAnimating(10);
