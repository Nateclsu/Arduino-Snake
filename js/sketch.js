let cellSize = 25;
let width = 500;
let height = 500;

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(230);
  grid();
 
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

class Snake {
  
}
  
