// File: src/sketches/sketch3.ts
import p5 from 'p5';


export const sketch3 = (p: p5) => {
  let x = 200;
  let y = 200;
  let xSpeed = 5;
  let ySpeed = 3;

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200, 220, 255);
    
    // Draw the ball
    p.fill(255, 0, 0);
    p.ellipse(x, y, 50, 50);
    
    // Move the ball
    x += xSpeed;
    y += ySpeed;
    
    // Bounce off edges
    if (x > p.width - 25 || x < 25) {
      xSpeed *= -1;
    }
    if (y > p.height - 25 || y < 25) {
      ySpeed *= -1;
    }
  };
};


export const sketch3Thumbnail = (p: p5) => {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.background(200, 220, 255);
    p.fill(255, 0, 0);
    p.ellipse(50, 50, 25, 25);
    p.stroke(0);
    p.line(25, 25, 75, 75);
    p.line(25, 75, 75, 25);
  };
};
