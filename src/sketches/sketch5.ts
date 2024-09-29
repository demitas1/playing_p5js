// File: src/sketches/sketch5.ts

import p5 from 'p5';


class Particle {
  p: p5;

  state: number;

  x: number;
  y: number;
  r: number;
  xSpeed: number;
  ySpeed: number;

  colorR: number;
  colorG: number;
  colorB: number;
  colorA: number;
  speed: number;

  x0: number;
  y0: number;
  r0: number;

  constructor(p: p5) {
    this.p = p;

    this.state = 0;

    this.x0 = this.p.width * 0.5;
    this.y0 = this.p.height * 0.25;
    this.r0 = this.p.width * 0.1;
  }

  createParticle() {
    this.p.noStroke();

    let c = this.p.color(this.colorR, this.colorG, this.colorB, this.colorA);
    this.p.fill(c);
    this.p.circle(this.x, this.y, this.r);
  }

  moveParticle() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    switch (this.state) {
      case 0:
        let r1 = this.p.random(0, this.r0);
        let th1 = this.p.random(0, 6.28);

        this.x = this.x0 + r1 * Math.cos(th1);
        this.y = this.y0 + r1 * Math.sin(th1);

        this.r = this.p.random(2, 8);
        this.xSpeed = 0.0;
        this.ySpeed = 0.0;

        this.speed = this.p.random(0.1, 2);
        this.colorR = 0;
        this.colorG = 127;
        this.colorB = 127;
        this.colorA = 127;

        this.state = 1;
        break;

      case 1:
        this.colorR += this.speed;
        if (this.colorR > 255) {
          this.colorR = 255;

          this.xSpeed = 0.0;
          this.ySpeed = this.p.random(1, 2);
          this.state = 2;
        }
        break;

      case 2:
        if (this.y > this.p.height) {
          this.xSpeed = 0.0;
          this.ySpeed = 0.0;
          this.state = 0;
        }
        break;

      default:
        this.state = 0;
    }

    let c = this.p.color(this.colorR, this.colorG, this.colorB, this.colorA);
    this.p.fill(c);
    this.p.circle(this.x, this.y, this.r);
  }
}


export const sketch5 = (p: p5) => {
  let particles: Particle[] = [];

  p.setup = () => {
    p.createCanvas(720, 400);
    for (let i = 0; i < 5000; i++) {
      particles.push(new Particle(p));
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


export const sketch5Thumbnail = (p: p5) => {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.background('#0f0f0f');
    p.noStroke();
    for (let i = 0; i < 10; i++) {
      p.circle(p.random(p.width), p.random(p.height), p.random(1, 8));
    }
  };
};
