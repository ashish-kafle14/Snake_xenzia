let gameContainer = document.querySelector(".game-container");
let scoreContainer = document.querySelector(".score-container");

let foodX, foodY;
let headX = 12, headY = 12;         // snake head
let velocityX = 0, velocityY = 0;  //for snake speed
let snakeBody = [];                //changes length of snake
let score = 0;

//to generate fruits
function generateFood() {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][1] == foodY && snakeBody[i][0] == foodX){
            generateFood();
        }
    }
}

// on collison with wall or body

function gameOver() {
    headX = 12;
    headY = 12;
    generateFood();
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    scoreContainer.innerHTML = "Score : " + score
    alert("Game Over");
}

// render fruits and snake

function renderGame() {
    let updatedGame = `<div class="food" style="grid-area:${foodY}/${foodX};"></div>`;

    if (foodX == headX && headY == foodY) {
        snakeBody.push([foodX, foodY]);
        generateFood();
        score += 10;
        scoreContainer.innerHTML = "Score : " + score
    }

    snakeBody.pop();
    headX += velocityX;
    headY += velocityY;
    snakeBody.unshift([headX, headY]);
    if (headX == 0 || headY == 0 || headX == 26 || headY == 26) {
        gameOver();
    }
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]) {
            gameOver();
        }

    }

    for (let i = 0; i < snakeBody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;

    }

    gameContainer.innerHTML = updatedGame;

}

generateFood();
setInterval(renderGame, 150);

//checking key presses
document.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key == "ArrowUp" || key== "w" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (key == "ArrowDown" || key== "s"  && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (key == "ArrowLeft" || key== "a"  && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (key == "ArrowRight" || key== "d"  && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
})