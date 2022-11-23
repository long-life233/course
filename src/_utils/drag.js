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
// ================
const { touchstart, touchmove, touchend } = getTouchEvents()

function getEventXY(e) {
  const xy = touchstart === "touchstart" ? {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY
  } : {
    x: e.clientX,
    y: e.clientY
  }

  return xy
}

function getTransformXY(dom) {
	let ntf = [0, 0]
	const tf = dom.style.transform.match(/([+-\d.]+(?=px))/g)
	if (tf) ntf = [Number(tf[0]) || 0, Number(tf[1]) || 0]
	const [x, y] = ntf;
	return { x, y }
}
// ================
class Drag {
  target = null;
  callback = null;
  pos = { x: 0, y: 0 };
  epos = { x: 0, y: 0 };
  
  constructor(target, callback, options) {
    this.target = target
    this.callback = callback

    const stopselect = (e) => {
      e.preventDefault()
    }
    const move = (e) => {
      const {x, y} = getEventXY(e)
      const {epos, pos} = this
      const npos = {
        x: pos.x + x - epos.x,
        y: pos.y + y - epos.y
      }
      if (options && options.stop) e.stopPropagation()
			if (options && options.prevent) e.preventDefault()
      if (typeof callback === "function") callback(e, npos)
    }
    const end = (e) => {
			if (options && options.stop) e.stopPropagation()
			if (options && options.prevent) e.preventDefault()
			document.removeEventListener(touchmove, move)
			document.removeEventListener(touchend, end)
			document.removeEventListener("selectstart", stopselect)
		}

    const start = (e) => {
      this.pos = getTransformXY(target)
      this.epos = getEventXY(e)
      if (options && options.stop) e.stopPropagation()
			if (options && options.prevent) e.preventDefault()
      document.addEventListener(touchmove, move, { passive: false })
			document.addEventListener(touchend, end, { passive: false })
			document.addEventListener("selectstart", stopselect)
    }
    
    this.target.addEventListener(touchstart, start, { passive: false })
  }
}



export default {
    beforeMount(el, binding){
      new Drag(el, binding.value, binding.modifiers)
    }
}