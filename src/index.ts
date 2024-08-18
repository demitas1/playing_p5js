import p5 from 'p5';
import { sketch1, sketch1Thumbnail } from './sketches/sketch1';
import { sketch2, sketch2Thumbnail } from './sketches/sketch2';
import { sketch3, sketch3Thumbnail } from './sketches/sketch3';
import { sketch4, sketch4Thumbnail } from './sketches/sketch4';

const sketches = [
  { sketch: sketch1, thumbnail: sketch1Thumbnail, description: "Circular sketch" },
  { sketch: sketch2, thumbnail: sketch2Thumbnail, description: "Rectangular sketch" },
  { sketch: sketch3, thumbnail: sketch3Thumbnail, description: "Bouncing ball animation" },
  { sketch: sketch4, thumbnail: sketch4Thumbnail, description: "WIP" },
];

let currentSketch: p5 | null = null;

function createThumbnail(sketch: (p: p5) => void, description: string): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'sketch-thumbnail';

  new p5(sketch, container);

  const desc = document.createElement('p');
  desc.textContent = description;
  container.appendChild(desc);

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
