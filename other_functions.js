function createStretchedPentagon(stretchFactor, offset) {
  let stretchedPentagon = [
    createVector(910 + randomGaussian(0, stretchFactor) + offset, 320 + offset),
    createVector(
      830.9188309203678 + randomGaussian(0, stretchFactor) + offset,
      510.9188309203678 + offset
    ),
    createVector(640 + randomGaussian(0, stretchFactor) + offset, 590 + offset),
    createVector(
      449.0811690796322 + randomGaussian(0, stretchFactor) + offset,
      510.91883092036784 + offset
    ),
    createVector(
      370 + randomGaussian(0, stretchFactor) + offset,
      320.00000000000006 + offset
    ),
    createVector(
      449.0811690796321 + randomGaussian(0, stretchFactor) + offset,
      129.0811690796322 + offset
    ),
    createVector(640 + randomGaussian(0, stretchFactor) + offset, 50 + offset),
    createVector(
      830.9188309203678 + randomGaussian(0, stretchFactor) + offset,
      129.08116907963213 + offset
    ),
  ];
  return stretchedPentagon;
}

function myFlowField(x, y, num_steps) {
  for (var n = 0; n < num_steps; n++) {
    var x_offset = x - left_x;
    var y_offset = y - top_y;
    var column_index = Math.round(x_offset / resolution);
    var row_index = Math.round(y_offset / resolution);
    if (column_index >= num_columns) column_index = num_columns - 1;
    if (row_index >= num_rows) row_index = num_rows - 1;

    var grid_angle = grid[column_index][row_index];
    var x_step = Math.abs(step_length * cos(grid_angle));
    var y_step = Math.abs(step_length * sin(grid_angle));
    // push();
    // translate(x, y);
    // arc(0, 0, x_step * 10, y_step * 10, 0, grid_angle, CHORD);
    ellipse(x, y, x_step * 30, y_step * 30);
    // pop();
    x = x + x_step;
    y = y + y_step;
  }
}

function drawCustomShape(shapeArchetype, color) {
  for (let j = 0; j < layers; j += 1) {
    let shape = polygon(shapeArchetype, 1);
    fill(color);
    beginShape();
    for (let i of shape) {
      vertex(i.x, i.y);
    }
    //blendMode('darken');
    let pxmax = getXmax(shape);
    let pymax = getYmax(shape);

    for (let k = 0; k < 100; k += 1) {
      let px = random(0, pxmax);
      let py = random(0, pymax);
      let wh =
        Math.abs(randomGaussian(pxmax, 0.03) - randomGaussian(pxmax, 0.02)) *
        1000;
      ellipse(px, py, wh, wh);
    }
    endShape(CLOSE);
  }
}

function getXmax(shape) {
  let retX = shape[0].x;
  for (let i = 0; i < shape.length; i += 1) {
    if (retX < shape[i].x) retX = shape[i].x;
  }
  return retX;
}

function getYmax(shape) {
  let retY = shape[0].y;
  for (let i = 0; i < shape.length; i += 1) {
    if (retY < shape[i].y) retY = shape[i].y;
  }
  return retY;
}

function polygon(currentShape, dep) {
  if (dep >= 7) {
    return currentShape;
  } else {
    const nextShape = [];
    for (let i in currentShape) {
      nextShape.push(currentShape[i]);
      let next = int(i) + 1;
      try {
        const midVector = createVector(
          (currentShape[next].x + currentShape[i].x) / 2,
          (currentShape[next].y + currentShape[i].y) / 2
        );
        const dx = randomGaussian(0, st_deviation);
        const dy = randomGaussian(0, st_deviation);
        midVector.add(dx, dy);
        nextShape.push(midVector);
      } catch (e) {
        // Handle end of array
        const midVector = createVector(
          (currentShape[0].x + currentShape[i].x) / 2,
          (currentShape[0].y + currentShape[i].y) / 2
        );
        const dx = randomGaussian(0, st_deviation);
        const dy = randomGaussian(0, st_deviation);
        midVector.add(dx, dy);
        nextShape.push(midVector);
      }
    }
    return polygon(nextShape, dep + 1);
  }
}
