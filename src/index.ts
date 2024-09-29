import p5 from 'p5';
import { sketch1, sketch1Thumbnail } from './sketches/sketch1';
import { sketch2, sketch2Thumbnail } from './sketches/sketch2';
import { sketch3, sketch3Thumbnail } from './sketches/sketch3';
import { sketch4, sketch4Thumbnail } from './sketches/sketch4';
import { sketch5, sketch5Thumbnail } from './sketches/sketch5';

interface SketchInfo {
  sketch: (p: p5) => void;
  thumbnail: ((p: p5) => void) | string;
  description: string;
}

const sketches: SketchInfo[] = [
  { sketch: sketch1, thumbnail: sketch1Thumbnail, description: "Circular sketch" },
  { sketch: sketch2, thumbnail: sketch2Thumbnail, description: "Rectangular sketch" },
  { sketch: sketch3, thumbnail: sketch3Thumbnail, description: "Bouncing ball" },
  { sketch: sketch4, thumbnail: sketch4Thumbnail, description: "Particle system" },
  { sketch: sketch5, thumbnail: sketch5Thumbnail, description: "Particle system" },
];

let currentSketch: p5 | null = null;

function createThumbnail(thumbnailData: ((p: p5) => void) | string, description: string): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'sketch-thumbnail';

  const desc = document.createElement('p');
  desc.textContent = description;
  container.appendChild(desc);

  if (typeof thumbnailData === 'string') {
    // If thumbnailData is a string, assume it's an image file name
    const img = document.createElement('img');
    img.src = thumbnailData;
    img.alt = description;
    img.width = 100;
    img.height = 100;
    container.appendChild(img);
  } else {
    // If thumbnailData is a function, create a p5 instance
    new p5(thumbnailData, container);
  }

  return container;
}

function setupSketchSelector() {
  const selectorDiv = document.getElementById('sketch-selector')!;

  sketches.forEach((s, index) => {
    const thumbnail = createThumbnail(s.thumbnail, s.description);
    thumbnail.onclick = () => loadSketch(index);
    selectorDiv.appendChild(thumbnail);
  });
}

function loadSketch(index: number) {
  if (currentSketch) {
    currentSketch.remove();
  }

  const sketchContainer = document.getElementById('sketch-container')!;
  sketchContainer.innerHTML = '';
  currentSketch = new p5(sketches[index].sketch, sketchContainer);
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle')!;
  toggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'light') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  });
}

setupSketchSelector();
setupThemeToggle();
