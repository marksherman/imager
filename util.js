// pass 'this' as obj
function isMouseWithin (obj) {
  if(mouseX > obj.x && mouseY > obj.y &&
     mouseX < obj.x + obj.w && mouseY < obj.y + obj.h) { 
      return true 
  }
  else { 
    return false 
  }
}

// y: starting pixel of object
// h: pixel height of object
// rows: number of rows object represents
// returns which row index the mouse falls within
function findMouseRow(y, h, rows) {
  return floor(map(mouseY - y, 0, h, 0, rows))
}

// x: starting pixel of object
// w: pixel width of object
// cols: number of columns object represents
// returns which column index the mouse falls within
function findMouseCol(x, w, cols) {
  return floor(map(mouseX - x, 0, w, 0, cols))
}
