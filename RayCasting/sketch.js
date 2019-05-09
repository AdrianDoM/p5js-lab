let walls = []
let sources = []

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

  sources.push(new Source(createVector(300, 300), color('cyan')))
  sources.push(new Source(createVector(300, 300), color('magenta')))
  sources.push(new Source(createVector(300, 300), color('yellow')))
}

function draw() {
  background(10)

  //for (let w of walls) w.display()

  for (let source of sources) {
    source.move()
    source.cast(walls)
    source.display()
  }
}
