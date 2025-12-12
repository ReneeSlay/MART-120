let player;
let bullets = [];
let enemies = [];
let score = 0;
let gameWon = false;

function setup() {
  createCanvas(600, 400);
  player = {
    x: width / 2,
    y: height - 40,
    w: 40,
    h: 20,
    speed: 5
  };
}

function draw() {
  background(30);

  if (gameWon) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("you win", width / 2, height / 2);
    return;
  }
  fill(255);
  textSize(20);
  text("Score: " + score, 10, 25);

  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  player.x = constrain(player.x, 0, width - player.w);

  fill(0, 200, 255);
  rect(player.x, player.y, player.w, player.h);

  if (frameCount % 60 === 0) {
    enemies.push({ x: random(20, width - 20), y: -20, size: 20 });
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    e.y += 2;
    fill(255, 50, 50);
    ellipse(e.x, e.y, e.size);
    if (e.y > height + 20) enemies.splice(i, 1);
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    b.y -= 6;
    fill(255, 255, 0);
    rect(b.x, b.y, 5, 10);

    if (b.y < 0) bullets.splice(i, 1);
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    for (let j = bullets.length - 1; j >= 0; j--) {
      let e = enemies[i];
      let b = bullets[j];

      if (dist(e.x, e.y, b.x, b.y) < e.size / 2) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score++;

        if (score >= 10) {
          gameWon = true;
        }

        break;
      }
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    bullets.push({ x: player.x + player.w / 2, y: player.y });
  }
}
