function setup() {
  createCanvas(400, 400);
  background('#63C6C8');

  fill('#D33B2F');
  noStroke();
  rect(0, 300, width, 100);

  let cx = width / 2;
  let cy = 250;
  let radius = 75;
  fill('#654321');
  stroke(0);
  ellipse(cx, cy - 20, radius * 2 + 20, radius * 1.6);
  beginShape();
  vertex(cx - radius - 10, cy - 40);
  bezierVertex(cx - radius - 60, cy + 10, cx - radius - 40, cy + 130, cx - radius - 10, cy + 140);
  bezierVertex(cx - radius + 20, cy + 130, cx - radius + 10, cy + 20, cx - radius - 10, cy - 40);
  endShape(CLOSE);
  beginShape();
  vertex(cx + radius + 10, cy - 40);
  bezierVertex(cx + radius + 60, cy + 10, cx + radius + 40, cy + 130, cx + radius + 10, cy + 140);
  bezierVertex(cx + radius - 20, cy + 130, cx + radius - 10, cy + 20, cx + radius + 10, cy - 40);
  endShape(CLOSE);
  fill('#D2B48C'); 
  stroke(0);
  ellipse(cx, cy, radius * 2, radius * 2);

  noStroke();
  fill('#0000FF');

  let eyeOffsetX = 25;
  let eyeOffsetY = 15;
  let eyeWidth = 20;
  let eyeHeight = 12;

  ellipse(cx - eyeOffsetX, cy - eyeOffsetY, eyeWidth, eyeHeight);  
  ellipse(cx + eyeOffsetX, cy - eyeOffsetY, eyeWidth, eyeHeight); 
  noFill();
  stroke(0);
  strokeWeight(3);

  let mouthWidth = 50;
  let mouthHeight = 30;
  arc(cx, cy + 20, mouthWidth, mouthHeight, 0, PI);
  fill('#654321'); 
  stroke(0);

  let bangsCount = 5;
  let bangWidth = 30;
  let bangHeight = 50;
  let startX = cx - (bangsCount / 2) * bangWidth + bangWidth / 2;
  let yTop = cy - radius;

  for (let i = 0; i < bangsCount; i++) {
    let x = startX + i * bangWidth;

    triangle(
      x, yTop,               
      x - bangWidth / 2, yTop + bangHeight,  
      x + bangWidth / 2, yTop + bangHeight   
    );
  }
}
