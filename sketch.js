function preload() {
  let rr = random([0,1,2,3,4]);
  // img =loadImage('assets/bitmap'+ rr +'.png');
  img =loadImage(imgs[rr]);
  angoff = PI / 180 * random(0,360);
  left_x = Math.round(ww * -0.5);
  right_x = Math.round(ww * 1.5);
  top_y = Math.round(hh * -0.5);
  bottom_y = Math.round(hh * 1.5); 
  resolution = Math.round(ww * 0.01); 
  num_columns = Math.round((right_x - left_x) / resolution);
  num_rows = Math.round((bottom_y - top_y) / resolution);
  grid = new Array(num_columns);
  for (var i=0; i<num_columns; i++)
    grid[i] = new Array(num_rows);
  pentagons = [];
  shapecolors = [];
  for (var i=0; i<5; i++) {
    pentagons.push(createStretchedPentagon(pp[i][0], pp[i][1]));
    shapecolors.push([random(0,150), random(0,150), random(0,150), 10]);
  }
  x1 = [];
  y1 = [];
  x2 = [];
  y2 = [];
  for (var i = 0; i < 10; i++) {
    x1.push(random(0, ww / 2));
    y1.push(random(0, hh / 2));
    x2.push(random(ww / 2, ww));
    y2.push(random(0, hh / 2));
  }
}

function setup() {
  noStroke();
  canvas = createCanvas(ww, hh);
  background(255);
  for (var i=0; i<5; i++) {
    drawCustomShape(pentagons[i], shapecolors[i]);
  }
  // filter(BLUR, 3);
  beginShape();
  for (var column=0; column<num_columns; column++) {
    for (var row=0; row<num_rows; row++) {
      var scaled_x = parseFloat(column) * 0.01;
      var scaled_y = parseFloat(row) * 0.01;
      var noise_val = noise(scaled_x, scaled_y);
      angle = map(noise_val, 0.0, 1.0, 0.0, TWO_PI) + radians(100);
      grid[column][row] = angle;
    }
  }
  var ec = color(255,255,255);
  ec.setAlpha(2);
  fill(ec);
  for (var i = 0; i < 10; i++) {
    myFlowField(x1[i], y1[i], num_steps);
  }
  for (var i = 0; i < 10; i++) {
    myFlowField(x2[i], y2[i], num_steps);
  }
  endShape();
  tint(255,180);
  translate(ww / 2, hh / 2);
  rotate(angoff);
  imageMode(CENTER);
  image(img, 0, 0, ww*1.5, hh*1.25);
}

function draw() {  
  noStroke();
  let borderColor = color(191, 185, 185);
  fill(borderColor);
  rect(0, 0, 12, hh);
  rect(0, 0, ww, 12);
  rect(0, hh-12, ww, hh);
  rect(ww-12, 0, ww, hh);
}

function windowResized() {
  hh = window.innerHeight;
  ww = hh*ratio;
  const dim = Math.min(ww, hh);
  M = dim / defaultSize;
  console.log(`M: ${M}`);
  R.reset();
  resizeCanvas(ww, hh);
  setup();
}

