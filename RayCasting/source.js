class Source {

  constructor(pos, c) {
    this.pos  = pos
    this.c    = c
    this.xoff = random(50)
    this.yoff = random(50)
    this.rays = []
    for (let i = 0; i < 360; i += 1)
      this.rays.push(new Ray(this.pos, p5.Vector.fromAngle(radians(i))))
  }

  move() {
    this.pos.set(noise(this.xoff) * width, noise(this.yoff) * height)
    this.xoff += 0.01
    this.yoff += 0.01
  }

  cast(walls) {
    for (let ray of this.rays) ray.cast(walls)
  }

  display() {
    this.c.setAlpha(50)
    for (let ray of this.rays) ray.display(this.c)
    noStroke()
    this.c.setAlpha(100)
    fill(this.c)
    ellipse(this.pos.x, this.pos.y, 20, 20)
  }

}
