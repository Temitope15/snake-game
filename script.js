//Define html elements
const board = document.getElementById('game-board');

//define game variables
const gridSize = 20
let snake = [{x:10, y:10}]
let food = generateFood()
let direction = 'right'
let gameInterval
let gameSpeedDelay

//draw game map, snake, food
function draw(){
    board.innerHTML = '';
    drawSnake();
    drawFood()
}

//Draw snake
function drawSnake(){
 snake.forEach((segment)=> {
    const snakeElement = createGameElement('div', 'snake')
    setPosition(snakeElement, segment)
    board.appendChild(snakeElement)
 })
 
}

//create a snake element or food cube
function createGameElement(tag ,className){
    const element = document.createElement(tag)
    element.className = className
    return element
}

//set the position of the snake
function setPosition(element, position) {
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

//testing the snake drawn
draw()

//draw food function
function drawFood(){
    const foodElement = createGameElement('div', 'food')
    setPosition(foodElement, food)
    board.appendChild(foodElement)
}

//function to generate food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1
    const y = Math.floor(Math.random() * gridSize) + 1

    return {x,y}
}

//moving the snake
function move(){
    const head = {...snake[0]}
    switch (direction) {
        case 'up':
            head.y--
            break;
        case 'down':
            head.y++
            break;
        case 'left':
            head.x--
            break;
        case 'right':
            head.x++
            break;
    }
    snake.unshift(head)
    // snake.pop()
    
    if(head.x === food.x && head.y === food.y){
        food = generateFood()
        clearInterval()
        gameInterval = setInterval(()=>{
            move()
            draw()
        }, gameSpeedDelay)
       
    } else {
        snake.pop()
    }
}

//test moving function
setInterval(()=>{
    move()
    draw()
}, 200)