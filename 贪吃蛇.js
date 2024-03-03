// Set up canvas
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Set unit size and game area
const unitSize = 20;
const gameArea = 600;

// Set initial position and speed of snake
let snake = [{ x: 10, y: 10 }];
let dx = unitSize;
let dy = 0;

// Set initial position of food
let food = { x: Math.floor(Math.random() * (gameArea / unitSize)) * unitSize, y: Math.floor(Math.random() * (gameArea / unitSize)) * unitSize };

// Update game state
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, gameArea, gameArea);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, unitSize, unitSize);

    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, unitSize, unitSize);
    });

    // Update snake position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * (gameArea / unitSize)) * unitSize, y: Math.floor(Math.random() * (gameArea / unitSize)) * unitSize };
    } else {
        snake.pop();
    }

    // Check if snake hits boundaries
    if (head.x < 0 || head.x >= gameArea || head.y < 0 || head.y >= gameArea || collision(head, snake.slice(1))) {
        clearInterval(gameLoop);
        alert("Game over!");
    }
}

// Collision detection
function collision(head, body) {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

// Control snake movement
document.addEventListener("keydown", event => {
    const key = event.key;
    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -unitSize;
    } else if (key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = unitSize;
    } else if (key === "ArrowLeft" && dx === 0) {
        dx = -unitSize;
        dy = 0;
    } else if (key === "ArrowRight" && dx === 0) {
        dx = unitSize;
        dy = 0;
    }
});

// Start game loop
const gameLoop = setInterval(update, 100);
