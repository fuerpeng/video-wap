export function getViewportSize () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

export function isJson (obj) {
  return typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
}
