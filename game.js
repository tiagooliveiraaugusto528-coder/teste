const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let paddleWidth = 10, paddleHeight = 75, ballSize = 10;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#fff";

    // Draw paddles
    context.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, aiPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fill();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // AI Paddle Movement
    if (aiPaddleY + paddleHeight / 2 < ballY) {
        aiPaddleY += 4; // Ai speed
    } else {
        aiPaddleY -= 4;
    }

    // Ball Collision with paddles
    if (ballX < paddleWidth) {
        if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            // Reset ball position
            resetBall();
        }
    } else if (ballX > canvas.width - paddleWidth) {
        if (ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            // Reset ball position
            resetBall();
        }
    }

    // Ball Collision with top and bottom
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1);
    ballSpeedY = 5 * (Math.random() < 0.5 ? 1 : -1);
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("mousemove", (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    playerPaddleY = mouseY - paddleHeight / 2;
});

gameLoop();
