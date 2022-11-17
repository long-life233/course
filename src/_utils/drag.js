function supportTouch (){
    return !!(("ontouchstart" in window) 
    || window.navigator && window.navigator.msPointerEnabled && window.MSGesture 
    || window.DocumentTouch && document instanceof window.DocumentTouch)
}

function getTouchEvents(){
    const touch= supportTouch()
    return {
        touchstart : touch?'touchstart':'mousedown',
        touchmove : touch?'touchmove':'mousemove',
        touchend : touch?'touchend':'mouseup'
    }
}

const { touchstart, touchmove, touchend } = getTouchEvents()

class Drag {
  target = null;
  callback = null;
  constructor(target, callback, options) {
    this.target = target
    this.callback = callback
    
    this.target.addEventListener(touchstart, start, )
  }
}



export default {
    beforeMount(el, binding){
      new Drag(el,binding.value,binding.modifiers)
    }
}