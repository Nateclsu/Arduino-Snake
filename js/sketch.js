let cellSize = 40;
let width = 600;
let height = 600;

let apple;
let banana;
let mushroom;
let orange;
let strawberry;
let watermelon;

let snakeArt;
let myFont;

let button;

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, highScore: 0, elapsedTime:0, state: GameState.Start};

function preload() {
  apple = loadImage("assets/sprites/apple.png");
  banana = loadImage("assets/sprites/banana.png");
  mushroom = loadImage("assets/sprites/mushroom.png");
  orange = loadImage("assets/sprites/orange.png");
  strawberry = loadImage("assets/sprites/strawberry.png");
  watermelon = loadImage("assets/sprites/watermelon.png");
  
  
  snakeArt = loadImage("assets/art/snakeArt.png");
  myFont = loadFont('assets/art/Prototype.ttf');
}

function setup() {
  createCanvas(width, height);
  
  startButton = new Button(280, 400, 50, "Press to Start");
}

function draw() {
  
  switch(game.state) {
    case GameState.Playing:    
      background(230);
      grid();
      
    case GameState.Start:
      background(0);
      fill(169, 169, 169);
      square(0, 0, 600);
      fill(0);
      square(15, 15, 570);
      startButton.show();
      image(snakeArt, 400, 120, 200, 200);
      fill(255);
      textFont(myFont);
      textSize(60);
      text('Snake Game', 270, 160);
      fill(255);
      rect(105, 200, 335, 12);
  }
}

function mouseClicked() {
  if (startButton.clicked(mouseX, mouseY)) {
      game.state = GameState.Playing;
  }
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

/*
class Snake {
  
}


class Food {
  
}
*/
  