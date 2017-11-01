export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function resizeCanvas() {
  var viewPort = window.innerWidth
  var canvas = document.getElementById('canvas')
  var width = 700
  if(viewPort <= 425) {
    width = 375
  } else if(viewPort <= 768) {
    width = 500
  }
  canvas.width = width
  canvas.height = width
}
