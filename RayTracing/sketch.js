let walls = []
let source

let xoff = 0
let yoff = 10

function setup() {
  createCanvas(600, 600)

  walls.push(new Wall(0, 0, width, 0))
  walls.push(new Wall(width, 0, width, height))
  walls.push(new Wall(0, 0, 0, height))
  walls.push(new Wall(0, height, width, height))

  walls.push(new Wall(250, 100, 350, 100))
  walls.push(new Wall(250, 100, 100, 500))
  walls.push(new Wall(100, 500, 200, 500))
  walls.push(new Wall(200, 500, 250, 360))
  walls.push(new Wall(250, 360, 350, 360))
  walls.push(new Wall(350, 360, 400, 500))
  walls.push(new Wall(400, 500, 500, 500))
  walls.push(new Wall(500, 500, 350, 100))

  source = new Source(createVector(300, 300))
}

function draw() {
  background(10)

  //for (let w of walls) w.display()

  source.pos.set(noise(xoff) * width, noise(yoff) * height)
  source.cast(walls)
  source.display()

  xoff += 0.01
  yoff += 0.01
}
