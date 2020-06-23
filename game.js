const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

const scoreboard = document.getElementById('score');
const curr = document.getElementById('currscore');

const box = 30;

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
}

let food = {
    x : Math.floor(Math.random()* 20) * box, 
    y : Math.floor(Math.random()* 20) * box
}
let score = 0;
curr.innerHTML = '0';
scoreboard.innerHTML = 'HIGH SCORE : '+localStorage.getItem('score');

let d;

document.addEventListener('keydown', direction);

function direction(event){
    let key = event.keyCode;

    if (key == 37 && d != 'RIGHT'){
        d = 'LEFT'
    }else if (key == 38 && d != 'DOWN'){
        d = 'UP';
    }else if (key == 39 && d != 'LEFT'){
        d = 'RIGHT';
    }else if (key == 40 && d != 'UP'){
        d = 'DOWN';
    }
}

function draw(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,600,600);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(0,0,600,600);


    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,box,box);
    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
 
    if(snakeX == food.x && snakeY == food.y){
        score++;
        curr.innerHTML = score;
        food = {
            x : Math.floor(Math.random()*20) * box,
            y : Math.floor(Math.random()*20) * box
        }
 
    }else{
        
        snake.pop();
    }
    

    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    

    
    if(snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19*box || collision(newHead,snake)){
        clearInterval(game);
        if (score > localStorage.getItem('score')){
            localStorage.setItem('score', score)
        }
    }
    
    snake.unshift(newHead);
}



let game = setInterval(draw,100);

function collision(head, array){
    for (let i = 0; i < array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
