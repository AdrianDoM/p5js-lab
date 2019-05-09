class Source {

  constructor(pos) {
    this.pos = pos
    this.rays = []
    for (let i = 0; i < 360; i += 1)
      this.rays.push(new Ray(this.pos, p5.Vector.fromAngle(radians(i))))
  }

  cast(walls) {
    for (let ray of this.rays) ray.cast(walls)
  }

  display() {
    for (let ray of this.rays) ray.display()
    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, 20, 20)
  }

}
