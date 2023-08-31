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