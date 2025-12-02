let player;
let obstacles = [];
let exitZone;
function setup() {
  createCanvas(800, 600);
  player = {
    x: 50,
    y: height / 2,
    size: 30,
    speed: 4
  }
  exitZone = {
    x: width - 80,
    y: height / 2 - 40,
    w: 60,
    h: 80
  };
  for (let i = 0; i < 5; i++) {
    obstacles.push(createRandomObstacle());
  }
}

function draw() {
  background(30);
  fill(0, 255, 0);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);

  for (let obs of obstacles) {
    if (obs.moving) {
      obs.x += obs.vx;
      obs.y += obs.vy;
    }
    if (obs.x > width) obs.x = 0;
    if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    if (obs.y < 0) obs.y = height;
    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
  }
  movePlayer();

  fill(0, 150, 255);
  ellipse(player.x, player.y, player.size);

  
  if (
    player.x > exitZone.x &&
    player.x < exitZone.x + exitZone.w &&
    player.y > exitZone.y &&
    player.y < exitZone.y + exitZone.h
  ) {
    fill(255);
    textSize(48);
    text("you win", width / 2 - 120, height / 2);
    noLoop();
  }
}
function movePlayer() {
  if (keyIsDown(87)) player.y -= player.speed;  
  if (keyIsDown(83)) player.y += player.speed;  
  if (keyIsDown(65)) player.x -= player.speed; 
  if (keyIsDown(68)) player.x += player.speed; 
}

function mousePressed() {

  obstacles.push({
    x: mouseX,
    y: mouseY,
    w: random(20, 60),
    h: random(20, 60),
    color: color(random(255), random(255), random(255)),
    vx: 0,
    vy: 0,
    moving: false
  });
}

function createRandomObstacle() {
  return {
    x: random(width),
    y: random(height),
    w: random(30, 70),
    h: random(30, 70),
    color: color(random(255), random(255), random(255)),
    vx: random(-2, 2),
    vy: random(-2, 2),
    moving: true
  };
}


