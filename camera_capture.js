// This effect uses AI to debug the pink filter

let capture;
let offsetX = 0;
let offsetY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); 
  capture = createCapture(VIDEO);
  capture.size(640, 480); 
  capture.hide();
  noCursor();
  background(255);
}

function draw() {
  let targetX = mouseX - 80; 
  let targetY = mouseY - 60; 

  offsetX += (targetX - offsetX) * 0.3;
  offsetY += (targetY - offsetY) * 0.3;

  let pg = createGraphics(620, 480);
  pg.image(capture, 0, 0);
  pg.loadPixels();

  for (let i = 0; i < pg.pixels.length; i += 4) {
    let r = pg.pixels[i];
    let g = pg.pixels[i + 1];
    let b = pg.pixels[i + 2];

    pg.pixels[i]     = min(255, r * 1.2 + 40);  
    pg.pixels[i + 1] = g * 0.6 + 50; 
    pg.pixels[i + 2] = b * 0.9 + 80;
  }

  pg.updatePixels();
  image(pg, offsetX, offsetY, 160, 120);
}