var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
var keys = [];
var player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    //   width: 50,
    //   height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false
};
var playerSprite = new Image();
playerSprite.src = './images/darthvader.png';
var drawSprite = function (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};
var movePlayer = function () {
    if (keys['ArrowUp'] && player.y >= player.speed) {
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys['ArrowDown'] &&
        player.y + player.height <= canvas.height - player.speed) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys['ArrowLeft'] && player.x >= player.speed) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys['ArrowRight'] &&
        player.x + player.width <= canvas.width - player.speed) {
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
};
var changeSpriteFrame = function () {
    if (player.frameX < 3 && player.moving) {
        player.frameX++;
    }
    else {
        player.frameX = 0;
    }
};
window.addEventListener('keydown', function (event) {
    keys[event.key] = true;
});
window.addEventListener('keyup', function (event) {
    delete keys[event.key];
    player.moving = false;
});
var animate = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width * 2, player.height * 2);
    movePlayer();
    changeSpriteFrame();
};
var fps, fpsInterval, startTime, now, then, elapsed;
var startAnimating = function (fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animationFrame();
};
var animationFrame = function () {
    requestAnimationFrame(animationFrame);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        animate();
    }
};
startAnimating(10);
