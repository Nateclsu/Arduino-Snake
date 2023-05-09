var cellSize = 40;
var space;
var gridSize = 30;

let width = 600;
let height = 600;

let apple;
let banana;
let mushroom;
let orange;
let strawberry;
let watermelon;
let food = ['apple', 'banana', 'mushroom', 'orange', 'strawberry', 'watermelon'];
let foodImages = [];

let snakeArt;
let myFont;

let button;
let dir;

document.addEventListener('keydown', function(k) {
  dir = k.code;
})

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, highScore: 0, state: GameState.Start};

function preload() {
  for(let i = 0; i < food.length; i++) {
    foodImages[i] = loadImage("assets/sprites/" + food[i] + ".png");
  }
  
  snakeArt = loadImage("assets/art/snakeArt.png");
  myFont = loadFont('assets/art/Prototype.ttf');
}

function setup() {
  createCanvas(width, height);
  frameRate(5);
  
  startButton = new Button(280, 400, 50, "Press to Start");
  againButton = new Button(300, 430, 50, "Play Again");
  snake = new Snake();
  food = new Food();
  
  space = width / 20;
}

function draw() {
  
  switch(game.state) {
    case GameState.Playing:    
      background(220);
      grid();
      
      if(!snake.dead) {
        snake.move();
        snake.tail();
        snake.edges();
        snake.show();
        food.show();
        if(snake.foodCollision(food)) {
          game.score++;
          snake.length += 1;
          food.respawn();
        }
      } 
      else {
        game.state = GameState.GameOver;
      }
      
      
      break;
      
      case GameState.GameOver:
        if(game.score > game.highScore) {
          game.highScore = game.score;
        }
      
        background(0);
        fill(255);
        textSize(60);
        textFont(myFont);
        text('Game Over', 300, 160);
        textSize(30);
        textFont(myFont);
        text('Score: ' + game.score, 300, 300);
        text('Highscore: ' + game.highScore, 300, 330);
        againButton.show();
        
        break;
        
    case GameState.Start:
      background(0);
      fill(169, 169, 169);
      square(0, 0, 600);
      fill(0);
      square(15, 15, 570);
      startButton.show();
      image(snakeArt, 390, 130, 250, 200);
      fill(255);
      textFont(myFont);
      textSize(60);
      text('Snake Game', 270, 160);
      fill(255);
      rect(105, 200, 335, 12);
      break;
  }
}

function mouseClicked() {
  if(startButton.clicked(mouseX, mouseY)) {
    switch(game.state) {
      case GameState.Start:
        game.state = GameState.Playing;
    }
  }
  if(againButton.clicked(mouseX, mouseY)) {
    switch(game.state) {
      case GameState.GameOver:
        gameReset();
        game.state = GameState.Playing;
    }
  }
}

function gameReset() {
  game.score = 0;
  dir = null;
  snake.dead = false;
  snake.length = 1;
  snake.posHistory = [snake.pos];
  snake.pos.x = 288;
  snake.pos.y = 288;
  food.respawn();
}

function grid() {
   for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      if ((x / cellSize + y / cellSize) % 2 === 0) {
        fill(0, 150, 25); // Light green
      } 
      else {
        fill(0, 200, 25); // Dark green
      }
      strokeWeight(0);
      rect(x, y, cellSize, cellSize);
    }
  }
}
  
class Button {
  constructor(x, y, radius, label) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.label = label;
  }
  
  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.radius) {
      return true;
    } else {
      return false;
    }
  }
  
  show() {
    stroke(0);
    strokeWeight(0);
    fill(255);
    ellipse(this.x, this.y, this.radius*2);
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(0);
    text(this.label, this.x, this.y);
  }
}


class Snake {
  constructor() {
    this.pos = createVector(288, 288);
    this.length = 1;
    this.posHistory = [this.pos];
    this.dead = false;
  }
  
  move() {
    if(dir === 'ArrowRight') {
      this.pos.x += space;
    }
    else if(dir === 'ArrowLeft') {
      this.pos.x -= space;
    }
    else if(dir === 'ArrowUp') {
      this.pos.y -= space;
    }
    else if(dir === 'ArrowDown') {
      this.pos.y += space;
    }
  }
  
  foodCollision(food) {
    let d = dist(this.pos.x, this.pos.y, food.x, food.y);
    if(d < 30) {
      return true;
    }
    else {
      return false;
    }
  }
  
  tail() {
    this.posHistory.push(this.pos.copy());
    
    if(this.posHistory.length > this.length) {
      this.posHistory.splice(0, 1);
    }
  }
  
  edges() {
    if(snake.pos.x < 0 || snake.pos.x > width || snake.pos.y < 0 || snake.pos.y > height) {
        this.dead = true;
      }
    
    for(var i = 0; i < this.posHistory.length - 1; i++) {
      if(this.pos.x === this.posHistory[i].x && this.pos.y === this.posHistory[i].y) {
        this.dead = true;
      }
    }
  }
  
  show() {
    noStroke();
    fill(0);
    
    for(let i = 0; i < this.posHistory.length; i++) {
      rect(this.posHistory[i].x, this.posHistory[i].y, space - 5);
    }
  }
  
}

class Food {
  
  constructor() {
    this.image = random(foodImages);
    this.cellSize = 40;
    this.gridSize = 600 / this.cellSize; // number of cells on each axis
    this.x = (Math.floor(random(this.gridSize)) * this.cellSize + this.cellSize / 2);
    this.y = (Math.floor(random(this.gridSize)) * this.cellSize + this.cellSize / 2);
    
    this.moved = false;
  }
  
  respawn() {
    this.moved = false;
    
    while(!this.moved) {
      this.image = random(foodImages);
      var newX = (Math.floor(random(this.gridSize)) * this.cellSize + this.cellSize / 2);
      var newY = (Math.floor(random(this.gridSize)) * this.cellSize + this.cellSize / 2);
    
      if(newX < 40 || newX > (width - 40) || newY < 40 || newY > (height - 40)) {
        newX = (Math.floor(random(this.gridSize)) * this.cellSize + this.cellSize / 2);
        newY = (Math.floor(random(this.gridSize)) * this.cellSize + this.cellSize / 2);
      }
      
      for(var i = 0; i < snake.posHistory.length; i++) {
        if(newX === snake.posHistory[i].x && newY === snake.posHistory[i].y) {
          break;
        }
        else {
          if(i === snake.posHistory.length - 1){
            this.x = newX;
            this.y = newY;
            
            this.moved = true;
          }
        }
      }
      
    }
        
  }
    
  show() {
    image(this.image, this.x, this.y, 30, 30);
  }
}