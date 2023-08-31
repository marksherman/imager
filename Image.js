class ImageGrid {
  constructor (imageWidth, imageHeight, colorDepth) {
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.colorDepth = colorDepth;
    this.cellSize = 25;
    this.x = 10;
    this.y = 75;
    this.w = this.imageWidth * this.cellSize;
    this.h = this.imageHeight * this.cellSize;

    this.rows = [];
    for (let row = 0; row < this.imageHeight; row++) {
      this.rows[row] = []
      for (let i = 0; i < this.imageWidth; i++) {
          this.rows[row][i] = {'color': 255, 'value': 2 ** colorDepth - 1};
      }
    }
  }

  draw () {
    push();
    stroke(1)
    translate(this.x, this.y)
    rect(0, 0, this.cellSize * this.imageWidth, this.cellSize * this.imageHeight)
    stroke(150);
    for (let row = 0; row < this.imageHeight; row++) {
      for (let col = 0; col < this.imageWidth; col++) {
        fill(this.rows[row][col].color);
        rect(col * this.cellSize, row * this.cellSize, this.cellSize);
      }
    }
    pop();
  }

  paintPixel (row, col, color, value) {
    this.rows[row][col] = {'color': color, 'value': value};
  }

  paintByMouse (color, value) {
    if(isMouseWithin(this)) {
      let mouseRow = floor(map(mouseY - this.y, 0, this.h, 0, this.imageHeight));
      let mouseCol = floor(map(mouseX - this.x, 0, this.w, 0, this.imageWidth));
      this.paintPixel(mouseRow, mouseCol, color, value);
    }
  }
}