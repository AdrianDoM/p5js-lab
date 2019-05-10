class Ray {

  constructor(pos, end) {
    this.pos = pos
    this.end = end
  }

  display() {
    stroke('cyan')
    strokeWeight(1)
    line(this.pos.x, this.pos.y, this.end.x, this.end.y)
    ellipse(this.pos.x, this.pos.y, this.dir.mag(), this.dir.mag())
  }

  march(walls, iter) {
    //if (iter <= 0) return

    this.dir = p5.Vector.sub(this.end, this.pos).normalize()

    let minDist = Infinity
    for (let wall of walls) {
      let dist = wall.dist(this.pos)
      if (dist < minDist) minDist = dist
    }

    if (minDist <= 1) return

    this.dir.setMag(minDist)
    this.end = p5.Vector.add(this.pos, this.dir)

    this.display()

    this.pos = this.end.copy()
    this.end.add(this.dir)

    this.march(walls, --iter)
  }

}
