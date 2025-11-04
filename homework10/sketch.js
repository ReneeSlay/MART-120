let x1, x2, y1, y2; 
let dx1, dx2, dy1, dy2;
let diagX, diagY, diagDX, diagDY;
let baseSize = 32;
let scaleFactor = 5;
let t = 0;
let speed = 0.02;

function setup() {
  createCanvas(600, 600);
  
  // initialize positions
  x1 = 100;
  x2 = 400;
  y1 = 450;
  y2 = 450;
  
  // random speeds for x movers
  dx1 = random(1, 3);
  dx2 = random(2, 4);
  
  // random speeds for y movers
  dy1 = random(1, 2);
  dy2 = random(2, 3);
  
  // diagonal mover
  diagX = 300;
  diagY = 300;
  diagDX = random(1, 2);
  diagDY = random(1, 2);
}

function draw() {
  background("#6ED3D3");
  
  // red torso
  fill("#DB4035");
  stroke(0);
  strokeWeight(2);
  rect(0, 400, width, 200);
  
  // Animate title scaling
  let s = map(sin(t), -1, 1, 1, scaleFactor);
  t += speed;
  
  textAlign(CENTER);
  textStyle(BOLD);
  fill(0);
  noStroke();
  textSize(baseSize * s);
  text("Self Portrait", width / 2, 40);
  
  // Move shapes
  x1 += dx1;
  x2 += dx2;
  y1 += dy1;
  y2 += dy2;
  diagX += diagDX;
  diagY += diagDY;
  
  // Bounce horizontally
  if (x1 < 50 || x1 > 550) dx1 *= -1;
  if (x2 < 50 || x2 > 550) dx2 *= -1;
  
  // Bounce vertically
  if (y1 < 300 || y1 > 550) dy1 *= -1;
  if (y2 < 300 || y2 > 550) dy2 *= -1;
  
  // Bounce diagonally
  if (diagX < 100 || diagX > 500) diagDX *= -1;
  if (diagY < 200 || diagY > 400) diagDY *= -1;
  
  // Draw head
  fill("#D9B48F");
  stroke(0);
  strokeWeight(2);
  ellipse(300, 350, 200, 200);
  
  // bangs
  fill("#5B3A29");
  stroke(0);
  strokeWeight(2);
  beginShape();
  for (let i = 220; i <= 380; i += 30) {
    vertex(i, 280);
    vertex(i + 15, 250);
    vertex(i + 30, 280);
  }
  endShape(CLOSE);
  
  // Ears moving along x-axis
  fill("#5B3A29");
  stroke(0);
  ellipse(x1, 370, 60, 160);
  ellipse(x2, 370, 60, 160);
  
  // Eyes moving along y-axis
  fill("blue");
  stroke(0);
  ellipse(270, y1 - 80, 25, 15);
  ellipse(330, y2 - 80, 25, 15);
  
  // Diagonal moving shape 
  fill("black");
  stroke(255);
  strokeWeight(2);
  ellipse(diagX, diagY, 20, 20);
  
  // smile
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(300, 370, 60, 40, 0, PI);
}




