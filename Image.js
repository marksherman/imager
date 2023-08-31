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
      let mouseRow = findMouseRow(this.y, this.h, this.imageHeight);
      let mouseCol = findMouseCol(this.x, this.w, this.imageWidth);
      this.paintPixel(mouseRow, mouseCol, color, value);
    }
  }

  getTextRepresentation () {
    let s = '';
    s = s + `${this.imageWidth}x${this.imageHeight}x${this.colorDepth}:`
    for (let row = 0; row < this.imageHeight; row++) {
      for (let col = 0; col < this.imageWidth; col++) {
        s = s + `${this.rows[row][col].value},`
      }
    }
    return s;
  }
}