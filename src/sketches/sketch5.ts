// File: src/sketches/sketch5.ts

import p5 from 'p5';


class Particle {
  p: p5;

  id: number;
  state: number;
  tween: number;
  speed: number;

  x: number;
  y: number;
  r: number;
  xSpeed: number;
  ySpeed: number;

  color: p5.Color;

  x0: number;
  y0: number;
  r0: number;

  constructor(p: p5, id: number) {
    this.p = p;
    this.id = id;

    this.state = 0;
    this.tween = 0.0;
    this.speed = 0.0;

    this.x0 = this.p.width * 0.5;
    this.y0 = this.p.height * 0.5;
    this.r0 = this.p.width * 0.08;
  }

  createParticle() {
    this.p.noStroke();

    let color0 = this.p.color(64, 64, 64, 127);
    this.color = color0;
    this.p.fill(this.color);
    this.p.circle(this.x, this.y, this.r);
  }

  moveParticle() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    let color0;
    let color1;

    switch (this.state) {
      case 0:
        // spark, initial position
        let r1 = this.p.random(0, this.r0);
        let th1 = this.p.random(0, 6.28);

        this.x = this.x0 + r1 * Math.cos(th1);
        this.y = this.y0 + r1 * Math.sin(th1);

        this.r = this.p.random(4, 8);
        this.xSpeed = 0.0;
        this.ySpeed = 0.0;

        this.speed = this.p.random(1, 2);
        this.color = this.p.color(64, 64, 64, 127);

        this.state = 1;
        this.tween = 0.0;
        this.speed = this.p.random(0.001, 0.01);
        break;

      case 1:
        // spark to burn
        this.tween += this.speed;
        if (this.tween > 1.0) {
          this.xSpeed = 0.0;
          this.ySpeed = 0.0;

          this.tween = 0.0;
          this.speed = this.p.random(0.01, 0.1);
          this.state = 2;
          break;
        }

        color0 = this.p.color(64, 64, 64, 127);
        color1 = this.p.color(255, 80, 64, 192);
        this.color = this.p.lerpColor(color0, color1, this.tween);
        break;

      case 2:
        // spark to burn more
        this.tween += this.speed;
        if (this.tween > 1.0) {
          this.xSpeed = 0.0;
          this.ySpeed = this.p.random(1, 2);

          this.tween = 0.0;
          this.speed = 0.4 / this.r;
          this.state = 3;
          break;
        }

        color0 = this.p.color(255, 80, 64, 192);
        color1 = this.p.color(255, 192, 64, 192);
        this.color = this.p.lerpColor(color0, color1, this.tween);
        break;

      case 3:
        // spark to fall off
        if (this.y < this.p.height) {
          this.tween += this.speed;
          if (this.tween > 1.0) {
            this.tween = 1.0;
          }

          if (this.ySpeed < 5.0) {
            this.ySpeed += 0.1;
          }
          color0 = this.p.color(255, 192, 64, 192);
          color1 = this.p.color(0, 0, 0, 0);
          this.color = this.p.lerpColor(color0, color1, this.tween);
        } else {
          this.xSpeed = 0.0;
          this.ySpeed = 0.0;
          this.state = 0;
          this.tween = 0.0;
        }
        break;

      default:
        this.state = 0;
    }

    this.p.fill(this.color);
    this.p.circle(this.x, this.y, this.r);
  }
}


export const sketch5 = (p: p5) => {
  let particles: Particle[] = [];

  p.setup = () => {
    p.createCanvas(720, 400);
    for (let i = 0; i < 5000; i++) {
      particles.push(new Particle(p, i));
    }
  };

  p.draw = () => {
    p.background('#0f0f0f');
    for (let i = 0; i < particles.length; i++) {
      particles[i].createParticle();
      particles[i].moveParticle();
    }
  };
};


// thumbnail provided by pre-rendered image
export const sketch5Thumbnail = 'sketch5.jpg';
