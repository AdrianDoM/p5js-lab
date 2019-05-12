class Line {

  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1)
    this.b = createVector(x2, y2)
    this.l = sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)
  }

  display() {
    stroke(255)
    strokeWeight(2)
    line(this.a.x, this.a.y, this.b.x, this.b.y)
  }

  dist(p) {
    const dir = p5.Vector.sub(this.b, this.a)
    const l2  = dir.magSq()
    
    if (l2 == 0) return p.dist(this.a) // a == b case
    
    const proj = dir.dot( p5.Vector.sub(p, this.a) ) / l2
    
    let t
    if (proj < 0) t = 0
    else if (proj > 1) t = 1
    else t = proj

    const closestPoint = p5.Vector.add(this.a, dir.mult(t))
    return p.dist(closestPoint)
  }

}

class Circle {

  constructor(x, y, r) {
    this.c = createVector(x, y)
    this.r = r
  }

  display() {
    stroke(255)
    noFill()
    strokeWeight(2)
    ellipse(this.c.x, this.c.y, this.r, this.r)
  }

  dist(p) {
    return abs(p.dist(this.c) - this.r)
  }

}
