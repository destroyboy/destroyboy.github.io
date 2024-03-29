class Shape {
  constructor(args) {
    this.fill = 255
    this.stroke = 0
    this.strokeWeight = 0
    this.x = 0
    this.y = 0
    for (const key in args) {
      this[key] = args[key]
    }
  }
  draw() {
    push()
    translate(this.x, this.y)
    this.onStyle()
    this.onDraw()
    pop()
  }
  onStyle() {
    fill(this.fill)
    stroke(this.stroke)
    strokeWeight(this.strokeWeight)
  }
  onDraw() {
    
  }
}

class Circle extends Shape {
  onDraw() {
    circle(0, 0, this.d)
  }
}

var scene

function setup() {
  var canvas = createCanvas(400, 400)
  canvas.parent("sketch")
  scene = new Circle({x:200, y:200, d:200})
}

function draw() {
  background(0)
  scene.draw()
}