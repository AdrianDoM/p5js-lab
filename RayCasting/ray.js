class Ray {

  constructor(pos, dir) {
    this.pos = pos
    this.dir = dir
    this.end = p5.Vector.add(pos, dir)
  }

  display(c) {
    stroke(c)
    strokeWeight(1)
    line(this.pos.x, this.pos.y, this.end.x, this.end.y)
  }

  cast(walls) {
    const dx1 = -this.dir.x
    const dy1 = -this.dir.y

    let minT = Infinity
    let minU = -1
    let minX, minY, minDx2, minDy2

    for (let wall of walls) {
      const dx2 = wall.a.x - wall.b.x
      const dy2 = wall.a.y - wall.b.y
      const dx  = this.pos.x - wall.a.x
      const dy  = this.pos.y - wall.a.y

      const den = dx1 * dy2 - dy1 * dx2
      const t = (dx * dy2 - dy * dx2) / den
      const u = (dy1 * dx - dx1 * dy) / den

      if (0 <= u && u <= 1 && 0 <= t && t < minT) {
        minT = t
        minU = u
        minX = wall.a.x
        minY = wall.a.y
        minDx2 = dx2
        minDy2 = dy2
      }
    }

    const u = minU
    if (0 <= u && u <= 1) {
      let p = createVector(minX - u * minDx2, minY - u * minDy2)
      this.end = p
      return p
    } else return false
  }

}
