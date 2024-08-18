// File: src/sketches/sketch4.ts
// 
// ported from https://editor.p5js.org/p5/sketches/Simulate:_Particle
// * @name Particles
// * @arialabel Small light grey circles connected by thin lines floating around a black background
// * @description There is a light-weight JavaScript library named
// * particle.js which creates a very pleasing particle system.
// * This is an attempt to recreate that particle system using p5.js.
// * Inspired by Particle.js, contributed by Sagar Arora.

import p5 from 'p5';

class Particle {
  x: number;
  y: number;
  r: number;
  xSpeed: number;
  ySpeed: number;
  p: p5;

  constructor(p: p5) {
    this.p = p;
    this.x = this.p.random(0, this.p.width);
    this.y = this.p.random(0, this.p.height);
    this.r = this.p.random(1, 8);
    this.xSpeed = this.p.random(-2, 2);
    this.ySpeed = this.p.random(-1, 1.5);
  }

  createParticle() {
    this.p.noStroke();
    this.p.fill('rgba(200,169,169,0.5)');
    this.p.circle(this.x, this.y, this.r);
  }

  moveParticle() {
    if (this.x < 0 || this.x > this.p.width)
      this.xSpeed *= -1;
    if (this.y < 0 || this.y > this.p.height)
      this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  joinParticles(particles: Particle[]) {
    particles.forEach(element => {
      let dis = this.p.dist(this.x, this.y, element.x, element.y);
      if (dis < 85) {
        this.p.stroke('rgba(255,255,255,0.04)');
        this.p.line(this.x, this.y, element.x, element.y);
      }
    });
  }
}


export const sketch4 = (p: p5) => {
  let particles: Particle[] = [];

  p.setup = () => {
    p.createCanvas(720, 400);
    for (let i = 0; i < p.width / 10; i++) {
      particles.push(new Particle(p));
    }
  };

  p.draw = () => {
    p.background('#0f0f0f');
    for (let i = 0; i < particles.length; i++) {
      particles[i].createParticle();
      particles[i].moveParticle();
      particles[i].joinParticles(particles.slice(i));
    }
  };
};


export const sketch4Thumbnail = (p: p5) => {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.background('#0f0f0f');
    p.noStroke();
    for (let i = 0; i < 10; i++) {
      p.fill('rgba(200,169,169,0.5)');
      p.circle(p.random(p.width), p.random(p.height), p.random(1, 8));
    }
    p.stroke('rgba(255,255,255,0.04)');
    for (let i = 0; i < 5; i++) {
      p.line(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));
    }
  };
};
