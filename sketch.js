let controlSizeW;
let controlSizeH;
let controlBitDepth;
let controlColorPicker;
let controlPaintingToggle;

let imageWidth = 10;
let imageHeight = 10;
let bitDepth = 1;
let selectedColor = 0;
let selectedValue = 0;
let painting = true;

let imageGrid;

let representationDiv;
let representationText;

function makeControls () {
  let line1 = createDiv();
  createSpan('image size: ').parent(line1);
  controlSizeW = createInput(10);
  controlSizeH = createInput(10);
  controlSizeW.parent(line1);
  createSpan(' x ').parent(line1);
  controlSizeH.parent(line1);
  controlSizeW.size(15);
  controlSizeH.size(15);
  createButton('restart').style('margin-left:15px').parent(line1).mouseClicked(restartImage);

  let line2 = createDiv();
  createSpan('bit depth: ').parent(line2);
  controlBitDepth = createSelect();
  controlBitDepth.parent(line2);
  controlBitDepth.option('1', 1);
  controlBitDepth.option('2', 2);
  controlBitDepth.option('3', 3);
  controlBitDepth.option('4', 4);
  controlBitDepth.option('8', 8);
  controlBitDepth.option('16', 16);
  controlBitDepth.changed(function () {
    bitDepth = controlBitDepth.value();
    controlColorPicker.draw();
  })

  let statusDiv = createDiv();
  createSpan('value: ').parent(statusDiv);
  createSpan().id('valueDisplay').parent(statusDiv);
  createSpan().id('hoverValue').style('font-style:italic,color:gray').parent(statusDiv);
  createSpan().id('paintingStatusDisplay').style('color:red;font-style:italic;padding-left:15px');

  line1.position(5, 5);
  line2.position(5, 30);

  controlColorPicker = {
    x: 110,
    y: 31,
    w: 200,
    h: 18,
    cellCount: 4,
    cellWidth: 50,
    getValueFromMouse: function () {
      // returns the value (cell number) of the color: 0 through cellCount -1
      // only valid if mouse is within the bounds of the color picker
      return findMouseCol(this.x, this.w, this.cellCount);
    },
    getColor: function (cell) {
      // given a value, find the right shade. 
      // 0 is always black, 0
      // max value is always white, 255
      // max value is cellCount - 1 (same as 2**bitDepth - 1)
      if (cell === 0) {
        return 0;
      } else if (cell === this.cellCount - 1) {
        return 255;
      } else {
        let cellColorWidth = 255 / this.cellCount;
        return map(cell, 1, this.cellCount - 1, cellColorWidth, 255 - cellColorWidth);
      }
    },
    draw: function () {
      noStroke();
      rect(this.x, this.y, this.w, this.h);
      this.cellCount = 2 ** bitDepth;
      this.cellWidth = this.w / this.cellCount;
      for (let i = 0; i < this.cellCount; i++) {
        fill(this.getColor(i));
        rect(this.x + i * this.cellWidth, this.y, this.cellWidth, this.h);
      }
      select('#valueDisplay').html(selectedValue);
      if(isMouseWithin(this)){
        select('#hoverValue').html(` → ${this.getValueFromMouse()}`);
      } else {
        select('#hoverValue').html('');
      }
      statusDiv.position(this.x, this.y + 25);
    },
    mouseClicked: function () {
      if(isMouseWithin(this)){
        selectedValue = this.getValueFromMouse();
        let c = this.getColor(selectedValue);
        selectedColor = c;
        select('#valueDisplay').html(selectedValue);
      }
    }
  }
  controlColorPicker.draw();

  controlPaintingToggle = {
    x: controlColorPicker.x + controlColorPicker.w + 10,
    y: controlColorPicker.y,
    w: controlColorPicker.h,
    h: controlColorPicker.h,
    draw: function () {
      fill('red');
      rect(this.x, this.y, this.w, this.h);
      stroke(255)
      const thrd = 1/3;
      const twth = 2/3;
      line(this.x + this.w * thrd, this.y + this.h * thrd, this.x + this.w * twth, this.y + this.h * twth);
      line(this.x + this.w * twth, this.y + this.h * thrd, this.x + this.w * thrd, this.y + this.h * twth);
    },
    mouseClicked: function () {
      if(isMouseWithin(this)){
        painting = !painting;
        if (painting) {
          select('#paintingStatusDisplay').html('')
        } else {
          select('#paintingStatusDisplay').html('painting disabled').position(this.x - 100, this.y + 25);
        }
      }
    }
  }
  controlPaintingToggle.draw();
}

function restartImage () {
  imageWidth = Number.parseInt(controlSizeW.value());
  imageHeight = Number.parseInt(controlSizeH.value());
  imageGrid = new ImageGrid(imageWidth, imageHeight, bitDepth);
  representationDiv.position(10, imageGrid.y + imageGrid.h + 10)
}

function mouseClicked () {
  controlColorPicker.mouseClicked();
  controlPaintingToggle.mouseClicked();
  if(painting == true) {
    imageGrid.paintByMouse(selectedColor, selectedValue);
  }
  redraw();
}

function setup () {
  createCanvas(windowWidth, windowHeight - 25);
  background(200);
  makeControls();
  representationDiv = createDiv();
  createDiv('text representation:').parent(representationDiv);
  representationText = createDiv().style('word-break: break-all;').parent(representationDiv);
  restartImage();
  noLoop();
}

function mouseMoved () {
  redraw();
}

function draw () {
  controlColorPicker.draw();
  imageGrid.draw();
  representationText.html(imageGrid.getHtmlRepresentation());
}
