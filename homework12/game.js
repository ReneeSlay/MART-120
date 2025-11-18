
// variables
let player;
let objects = [];    
let obstacles = []; 
let exitZone;
let gameWon = false;  


// setup
function setup() {
  createCanvas(600, 400);

  createPlayer();
  createObstacles();
  createExit();
}

// draw
function draw() {
  background(30);

  drawBorder();

  movePlayer();
  drawPlayer();

  drawMouseObjects();

  moveObstacle1();
  moveObstacle2();
  drawObstacles();

  drawExit();
  checkWin();
  displayWinMessage();
}
// player
function createPlayer() {
  player = {
    x: 100,
    y: height / 2,
    size: 25,
    speed: 3,
    color: color(255, 200, 0)
  };
}

function drawPlayer() {
  fill(player.color);
  noStroke();
  ellipse(player.x, player.y, player.size);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW))  player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW))    player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW))  player.y += player.speed;

  // keep inside screen
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

// mouse objects
function mousePressed() {
  objects.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 40),
    color: color(random(255), random(255), random(255))
  });
}

function drawMouseObjects() {
  for (let o of objects) {
    fill(o.color);
    noStroke();
    ellipse(o.x, o.y, o.size);
  }
}


function createObstacles() {
  // obstacle 1
  obstacles.push({
    x: 80,
    y: 50,
    size: 40,
    color: color(255, 0, 0),
    vx: 2,
    vy: 1.5
  });

  // obstacle 2
  obstacles.push({
    x: 500,
    y: 320,
    size: 60,
    color: color(0, 200, 255),
    vx: -1.5,
    vy: 2
  });
}

function drawObstacles() {
  for (let o of obstacles) {
    fill(o.color);
    noStroke();
    ellipse(o.x, o.y, o.size);
  }
}

// obstacle 1 movement
function moveObstacle1() {
  let o = obstacles[0];
  o.x += o.vx;
  o.y += o.vy;
  wrap(o);
}

// obstacle 2 movement
function moveObstacle2() {
  let o = obstacles[1];
  o.x += o.vx;
  o.y += o.vy;
  wrap(o);
}

// wrap obstacles
function wrap(o) {
  if (o.x > width)  o.x = 0;
  if (o.x < 0)      o.x = width;
  if (o.y > height) o.y = 0;
  if (o.y < 0)      o.y = height;
}


// border
function drawBorder() {
  noFill();
  stroke(255);
  strokeWeight(4);
  rect(0, 0, width, height);
}

// exit
function createExit() {
  exitZone = {
    x: width - 60,
    y: height / 2 - 30,
    w: 50,
    h: 60,
    color: color(0, 255, 100)
  };
}

function drawExit() {
  fill(exitZone.color);
  noStroke();
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
}

function checkWin() {
  if (
    player.x > exitZone.x &&
    player.x < exitZone.x + exitZone.w &&
    player.y > exitZone.y &&
    player.y < exitZone.y + exitZone.h
  ) {
    gameWon = true;
  }
}

function displayWinMessage() {
  if (gameWon) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("YOU WIN!", width / 2, height / 2);
  }
}

