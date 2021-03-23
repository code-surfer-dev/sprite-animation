const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
  x: 0,
  y: 0,
  width: 32,
  height: 48,
  //width: 50,
  //height: 48,
  //width: 96,
  //height: 96,
  frameX: 0,
  frameY: 0,
  speed: 15,
  moving: false,
};

const vader = {
  x: canvas.width - 64,
  y: 0,
  width: 32,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 5,
  moving: false,
};

const playerSprite = new Image();
playerSprite.src = './images/yoda.png';

const vaderSprite = new Image();
vaderSprite.src = './images/darthvader.png';

const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
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
    player.y + player.height <= canvas.height - player.height - player.speed
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
    player.x + player.width <= canvas.width - player.width - player.speed
  ) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
};

const moveVader = () => {
  vader.moving = false;
  if (vader.y > player.y + player.height) {
    vader.y -= vader.speed;
    vader.frameY = 3;
    vader.moving = true;
  }
  if (vader.y < player.y - player.height) {
    vader.y += vader.speed;
    vader.frameY = 0;
    vader.moving = true;
  }
  if (vader.x > player.x + player.width) {
    vader.x -= vader.speed;
    vader.frameY = 1;
    vader.moving = true;
  }
  if (
    vader.x < player.x - player.width) {
    vader.x += vader.speed;
    vader.frameY = 2;
    vader.moving = true;
  }
};

const changeSpriteFrame = () => {
  if (player.frameX < 3 && player.moving) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
  if (vader.frameX < 3 && vader.moving) {
    vader.frameX++;
  } else {
    vader.frameX = 0;
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
    vaderSprite,
    vader.width * vader.frameX,
    vader.height * vader.frameY,
    vader.width,
    vader.height,
    vader.x,
    vader.y,
    vader.width * 2,
    vader.height * 2,
  );
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
  moveVader();
  changeSpriteFrame();
};

let fps, fpsInterval, startTime, now, then, elapsed, updateThen;
let updateInterval = 10000;

const startAnimating = fps => {
  fpsInterval = 1000 / fps;
  then = Date.now();
  updateThen = then;
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
  elapsed = now - updateThen;
  if (elapsed > updateInterval) {
    updateThen = now - (elapsed % updateInterval);
    vader.speed++;
  }
};

startAnimating(10);
