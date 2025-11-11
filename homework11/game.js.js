let player;
let obstacles = [];
let staticObstacle = null;
let exitZone;
let win = false;

function setup() {
  createCanvas(600, 400);

  // Create player
  player = {
    x: 50,
    y: height / 2,
    size: 30,
    speed: 3
  };

  // Create random moving obstacles
  for (let i = 0; i < 3; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      w: random(30, 60),
      h: random(30, 60),
      color: color(random(255), random(255), random(255)),
      xSpeed: random(-2, 2),
      ySpeed: random(-2, 2)
    });
  }

  // Create exit zone
  exitZone = {
    x: width - 70,
    y: height / 2 - 40,
    w: 60,
    h: 80
  };
}

function draw() {
  background(220);

  // Draw exit zone
  fill(0, 255, 0);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
  textSize(16);
  fill(0);
  text("EXIT", exitZone.x + 10, exitZone.y + exitZone.h / 2);

  // Draw player
  fill(0, 0, 255);
  rect(player.x, player.y, player.size, player.size);

  // Move player with keys
  movePlayer();

  // draw and move obstacles
  for (let obs of obstacles) {
    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
    obs.x += obs.xSpeed;
    obs.y += obs.ySpeed;

    // Wrap obstacles around screen
    if (obs.x > width) obs.x = 0;
    else if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    else if (obs.y < 0) obs.y = height;
  }

  // Draw static obstacle
  if (staticObstacle) {
    fill(255, 0, 0);
    rect(staticObstacle.x, staticObstacle.y, staticObstacle.w, staticObstacle.h);
  }

  // Check if player reached exit
  if (
    player.x + player.size > exitZone.x &&
    player.x < exitZone.x + exitZone.w &&
    player.y + player.size > exitZone.y &&
    player.y < exitZone.y + exitZone.h
  ) {
    win = true;
  }

  // Display win message
  if (win) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
    noLoop(); // stop the game
  }
}

function movePlayer() {  // keys
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { 
    player.x -= player.speed;
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { 
    player.x += player.speed;
  }

  if (keyIsDown(UP_ARROW) && player.y > 0) {
    player.y -= player.speed;
  } else if (keyIsDown(DOWN_ARROW) && player.y < height - player.size) {
    player.y += player.speed;
  }

  // Keep player inside canvas
  if (player.x < 0) player.x = 0;
  else if (player.x > width - player.size) player.x = width - player.size;
}

function mousePressed() {
  // Add one static obstacle 
  if (!staticObstacle) {
    staticObstacle = {
      x: mouseX - 25,
      y: mouseY - 25,
      w: 50,
      h: 50
    };
  }
}

