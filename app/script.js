/* =====================
   DOM ELEMENTS
===================== */
const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const bricksContainer = document.getElementById("bricks");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const endScreen = document.getElementById("endScreen");
const endMessage = document.getElementById("endMessage");
const game = document.getElementById("game");

endScreen.classList.add("hidden");

/* =====================
   GAME SETTINGS
===================== */
const gameWidth = 960;
const gameHeight = 640;

const ballSize = 16;
let ballX = gameWidth / 2;
let ballY = gameHeight - 60;
let dx = 6;
let dy = -6;

const paddleWidth = 120;
let paddleX = (gameWidth - paddleWidth) / 2;

const rows = 5;
const cols = 8;
const brickWidth = 105;
const brickHeight = 40;
const brickPadding = 10;
const offsetTop = 30;
const offsetLeft = 30;

let rightPressed = false;
let leftPressed = false;

let score = 0;
let lives = 3;
let gameOver = false;

updateSL();

const bricks = [];

for (let c = 0; c < cols; c++) {
  bricks[c] = [];
  for (let r = 0; r < rows; r++) {
    const brick = document.createElement("div");
    brick.classList.add("brick");

    const x = c * (brickWidth + brickPadding) + offsetLeft;
    const y = r * (brickHeight + brickPadding) + offsetTop;

    brick.style.left = x + "px";
    brick.style.top = y + "px";

    bricksContainer.appendChild(brick);
    bricks[c][r] = brick;
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") rightPressed = true;
  if (e.key === "ArrowLeft") leftPressed = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowRight") rightPressed = false;
  if (e.key === "ArrowLeft") leftPressed = false;
});



function update() {
  if (gameOver) return;

  /* Paddle movement */
  if (rightPressed && paddleX < gameWidth - paddleWidth) {
    paddleX += 8;
  }
  if (leftPressed && paddleX > 0) {
    paddleX -= 8;
  }
  paddle.style.left = paddleX + "px";

  /* Ball movement */
  ballX += dx;
  ballY += dy;

  /* Wall collisions */
  if (ballX <= 0 || ballX >= gameWidth - ballSize) dx = -dx;
  if (ballY <= 0) dy = -dy;

  /* Paddle collision */
  if (
    ballY >= gameHeight - 50 &&
    ballX > paddleX &&
    ballX < paddleX + paddle.offsetWidth
  ) {
    dy = -dy;
  }

  /* Brick collisions */
  bricks.forEach((column, cIndex) => {
    column.forEach((brick, rIndex) => {
      if (!brick) return;

      const rect = brick.getBoundingClientRect();
      const gameRect = game.getBoundingClientRect();

      const bx = rect.left - gameRect.left;
      const by = rect.top - gameRect.top;

      if (
        ballX > bx &&
        ballX < bx + brickWidth &&
        ballY > by &&
        ballY < by + brickHeight
      ) {5
        dy = -dy;
        brick.remove();
        bricks[cIndex][rIndex] = null;

        score++;
        updateSL();

        if (score === rows * cols) {
          endGame(true);
        }
      }
    });
  });

  /* Miss paddle */
  if (ballY >= gameHeight - ballSize) {
    lives--;
    updateSL();

    if (lives === 0) {
      endGame(false);
    } 
    
    else {
      resetBall();
    }
  }

  /* Apply positions */
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  requestAnimationFrame(update);
}

/* =====================
   HELPERS
===================== */
function updateSL() {
  scoreEl.textContent = `Score: ${score}`;
  livesEl.textContent = `Lives: ${lives}`;
}

function resetBall() {
  ballX = gameWidth / 2;
  ballY = gameHeight - 60;
  dx = 6;
  dy = -6;
}

function endGame(win) {
  gameOver = true;
  endScreen.classList.remove("hidden");
  if (win) {
  endMessage.textContent = "YOU SAVED THE DUCKS!";
} else {
  endMessage.textContent = "TOO MANY DUCKS!";
}
}

function restartGame() {
  location.reload();
}

/* =====================
   START GAME
===================== */
update();



// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// let ballRadius = 8;
// let ballX = canvas.width / 2;
// let ballY = canvas.height - 30;

// let dx = 10;
// let dy = -10;

// let paddleHeight = 30;
// let paddleWidth = 100;
// let paddleX = (canvas.width - paddleWidth) / 2;
// let paddleOffSetBottom = 10;

// let rightPressed = false;
// let leftPressed = false;
// // let aPressed = false;
// // let dPressed = false;

// const brickRowCount = 6; 
// const brickColumnCount = 8; 
// const brickWidth = 105;
// const brickHeight = 30;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;

// let score = 0;
// let lives = 3;

// const bricks = [];
// for(let c = 0; c < brickColumnCount; c++) {
//   bricks[c] = [];
//   for(let r = 0; r < brickRowCount; r++) {
//     bricks[c][r] = { x: 0, y: 0, status: 1 };
//   }
// }


// document.addEventListener("keydown", keyDownHandler);
// document.addEventListener("keyup", keyUpHandler);
// // document.addEventListener("keya", keyAHandler);
// // document.addEventListener("keyd", keyDHandler);

// function keyDownHandler(e) {
//   if(e.key === "ArrowRight") {
//     rightPressed = true;
//   } else if(e.key === "ArrowLeft") {
//     leftPressed = true;
//   }
// }

// function keyUpHandler(e) {
//   if(e.key === "ArrowRight") {
//     rightPressed = false;
//   } else if(e.key === "ArrowLeft") {
//     leftPressed = false;
//   }
// }

// // function keyAHandler(e) {
// //   if(e.key === "KeyA") {
// //     aPressed = true;
// //   } else if(e.key === "KeyD"  ) {
// //     dPressed = true;
// //   }
// // }

// // function keyDHandler(e) {
// //   if(e.key === "KeyA") {
// //     aPressed = false;
// //   } else if(e.key === "KeyD") {
// //     dPressed = false;
// //   }
// // }


// const paddleImage = new Image();
// paddleImage.src = '../images/lazy-baby-duck-sleeping-cute-260nw-1747884617.webp';

// const brickImage = new Image();
// brickImage.src = '../images/lazy-baby-duck-sleeping-cute-260nw-1747884617.webp'; 

// const alertImage = new Image();
// brickImage.src = '../images/lazy-baby-duck-sleeping-cute-260nw-1747884617.webp'; 

// function drawPaddle() {
//   ctx.beginPath();
//   ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//   ctx.drawImage(paddleImage, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//   ctx.closePath();
// }

// // function drawPaddle() {
// //   ctx.beginPath();
// //   ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
// //   ctx.style.backgroundImage = 'url("../images/fireworks-2585843_640.jpg")';
// //   ctx.fill();
// //   ctx.closePath();
// // }

// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c++) {
//     for (let r = 0; r < brickRowCount; r++) {
//       if (bricks[c][r].status === 1) {
//         const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
//         const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

//         bricks[c][r].ballX = brickX;
//         bricks[c][r].ballY = brickY;

//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);

//         ctx.drawImage(brickImage, brickX, brickY, brickWidth, brickHeight);
        
//         ctx.closePath();
//       }
//     }
//   }
// }


// function drawScore() {
//   ctx.font = "16px Arial";
//   ctx.fillStyle = "#000";
//   ctx.fillText("Score: " + score, 8, 20);
// }

// function drawLives() {
//   ctx.font = "16px Arial";
//   ctx.fillStyle = "#000";
//   ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
// }

// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
//   ctx.fillStyle = "#000";
//   ctx.fill();
//   ctx.closePath();
// }

// function collisionDetection() {
//   for(let c = 0; c < brickColumnCount; c++) {
//     for(let r = 0; r < brickRowCount; r++) {
//       const b = bricks[c][r];
//       if(b.status === 1) {
//         if(
//           ballX > b.ballX &&
//           ballX < b.ballX + brickWidth &&
//           ballY > b.ballY &&
//           ballY < b.ballY + brickHeight
//         ) {
//           dy = -dy;
//           b.status = 0;
//           score++;
//           if(score === brickRowCount * brickColumnCount) {
//             alert("YOU WIN!");
//             document.location.reload();
//           }
//         }
//       }
//     }
//   }
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   drawBricks();
//   drawBall();
//   drawPaddle();
//   drawScore();
//   drawLives();
//   collisionDetection();


//   if(ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
//     dx = -dx;
//   }
//   if(ballY + dy < ballRadius) {
//     dy = -dy;
//   } else if(ballY + dy > canvas.height - paddleHeight) {
//     if(ballX > paddleX && ballX < paddleX + paddleWidth) {
//       dy = -dy;
//     }
//     else {
//       lives--;
//       if(!lives) {
//         alert(alertImage);
//         document.location.reload();
//       } else {
//         ballX = canvas.width / 2;
//         ballY = canvas.height - 30;
//         dx = 10;
//         dy = -10;
//         paddleX = (canvas.width - paddleWidth) / 2;
//       }
//     }
//   }

//   if(rightPressed && paddleX < canvas.width - paddleWidth) {
//     paddleX += 5;
//   }
//   else if(leftPressed && paddleX > 0) {
//     paddleX -= 5;
//   }

//   ballX += dx;
//   ballY += dy;
//   requestAnimationFrame(draw);
// }

// draw();
