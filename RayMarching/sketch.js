let walls = []
let ray

let xoff = 0
let yoff = 30

function setup() {
  createCanvas(600, 600)
  ellipseMode(RADIUS)

  walls.push(new Circle(300, 300, 50))
  walls.push(new Circle(100, 100, 70))
  walls.push(new Circle(500, 200, 30))
  walls.push(new Circle(300, 300, 300))

  walls.push(new Line(0, 0, width, 0))
  walls.push(new Line(width, 0, width, height))
  walls.push(new Line(0, 0, 0, height))
  walls.push(new Line(0, height, width, height))

  ray = new Ray(createVector(500, 100), createVector(mouseX, mouseY))
}

function draw() {
  background(10)

  ray = new Ray(createVector(noise(xoff) * width, noise(yoff) * height),
    createVector(mouseX, mouseY))
  ray.march(walls, 100)

  for (let wall of walls) wall.display()

  xoff += 0.01
  yoff += 0.01
}
