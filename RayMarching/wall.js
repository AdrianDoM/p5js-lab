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
    const num = (this.b.y - this.a.y) * p.x - (this.b.x - this.a.x) * p.y
      + this.b.x * this.a.y - this.b.y * this.a.x
    const ortDist = abs(num) / this.l
    const verDist = min(p.dist(this.a), p.dist(this.b))
    return abs(num) / this.l
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
