import p5 from 'p5';


export const sketch1 = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(p.width / 2, p.height / 2, 80, 80);
  };
};


export const sketch1Thumbnail = (p: p5) => {
  p.setup = () => {
    p.createCanvas(100, 100);
    p.background(220);
    p.ellipse(50, 50, 20, 20);
  };
};
