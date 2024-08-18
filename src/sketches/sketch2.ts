import p5 from 'p5';


export const sketch2 = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200);
    p.rect(p.width / 4, p.height / 4, p.width / 2, p.height / 2);
  };
};


// thumbnail provided by pre-rendered image
export const sketch2Thumbnail = 'sketch2.png';
