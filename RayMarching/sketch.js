let walls = []
let ray
let origin

let xoff = 0
let yoff = 30

function setup() {
  createCanvas(600, 600)
  ellipseMode(RADIUS)

  walls.push(new Line(0, 0, width, 0))
  walls.push(new Line(width, 0, width, height))
  walls.push(new Line(0, 0, 0, height))
  walls.push(new Line(0, height, width, height))

  walls.push(new Line(100, 100, 200, 100))
  walls.push(new Line(100, 100, 100, 200))
  walls.push(new Line(100, 400, 100, 500))
  walls.push(new Line(100, 500, 200, 500))
  walls.push(new Line(400, 100, 500, 100))
  walls.push(new Line(500, 100, 500, 200))
  walls.push(new Line(400, 500, 500, 500))
  walls.push(new Line(500, 500, 500, 400))

  walls.push(new Circle(300, 300, 100))
  //walls.push(new Circle(300, 300, 50))
  //walls.push(new Circle(100, 100, 70))
  //walls.push(new Circle(500, 200, 30))
  //walls.push(new Circle(300, 300, 300))

  origin = createVector(300, 220)
  //ray = new Ray(createVector(500, 100), createVector(mouseX, mouseY))
}

function draw() {
  background(10)

  let mouse = createVector(mouseX, mouseY)
  if (origin.dist(mouse) >= 1)
    ray = new Ray(origin, createVector(mouseX, mouseY))
  ray.march(walls)

  for (let i = 4; i < walls.length; i++) walls[i].display()

  xoff += 0.01
  yoff += 0.01
}

function mouseClicked() {
  origin.set(mouseX, mouseY)
}
