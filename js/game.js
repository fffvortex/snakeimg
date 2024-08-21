const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext("2d")

const fieldImg = new Image()
fieldImg.src = 'img/game.png'

const foodImg = new Image()
foodImg.src = 'img/food.png'

let box = 32

let score = 0

let delay = 400

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}

let snakes = []

snakes[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener('keydown', direction)

let dir

function direction(event) {

    if ((event.keyCode === 37 || event.keyCode === 65) && dir != 'R') {
        dir = 'L'
    }
    else if ((event.keyCode === 38 || event.keyCode === 87) && dir != 'D') {
        dir = 'U'
    }
    else if ((event.keyCode === 39 || event.keyCode === 68) && dir != 'L') {
        dir = 'R'
    }
    else if ((event.keyCode === 40 || event.keyCode === 83) && dir != 'U') {
        dir = 'D'
    }
}

function eatTail(head,arr){
    for (let i = 0; i < arr.length; i++) {
        if(head.x === arr[i].x && head.y === arr[i].y){
            clearInterval(game)
        }
    }
}

function drawGame() {
    ctx.drawImage(fieldImg, 0, 0)

    ctx.drawImage(foodImg, food.x, food.y)

    for (let i = 0; i < snakes.length; i++) {
        ctx.fillStyle = i == 0 ? '#44a617' : 'green'
        ctx.fillRect(snakes[i].x, snakes[i].y, box - 1, box - 1)
    }

    ctx.fillStyle = 'white'
    ctx.font = '35px Arial'
    ctx.fillText(score, box * 2.5, box * 1.6)

    let snakeX = snakes[0].x
    let snakeY = snakes[0].y

    if (snakeX === food.x && snakeY === food.y) {
        score++
        if(score === 5 || score === 10 || score === 15 || score === 20){

            delay -= 100
            console.log(delay)
        }
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        }
    }
    else {
        snakes.pop()
    }

    
    if (dir === 'L') {
        snakeX -= box
    }
    if (dir === 'R') {
        snakeX += box
    }
    if (dir === 'U') {
        snakeY -= box
    }
    if (dir === 'D') {
        snakeY += box
    }
    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game)
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    eatTail(newHead, snakes)

    snakes.unshift(newHead)
}

let game = setInterval(drawGame, delay)