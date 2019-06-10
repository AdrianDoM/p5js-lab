const L = lalolib

let bgColor

let x_vals = []
let y_vals = []
let plot_range, reg1, reg2

function setup() {
  let cnv
  if (windowWidth >= 650)
    cnv = createCanvas(600, 400)
  else
    cnv = createCanvas(windowWidth - 20, (windowWidth - 20) * 4 / 6)
  cnv.parent('canvasWrapper')
  cnv.touchMoved(event => event.preventDefault())

  bgColor = color('lightcyan')
  background(bgColor)

  resetPoints()

  plot_range = L.range(0, width + 3, 3)
  reg1 = new PolyRegression(1, color('tomato'))
  reg2 = new PolyRegression(1, color('teal'))
}

function draw() {
  
  background(bgColor)

  let pushed = false
  if (!x_vals.includes(mouseX) && !y_vals.includes(mouseY) && mouseOverCanvas()) {
    x_vals.push(mouseX)
    y_vals.push(mouseY)
    pushed = true
  }

  if (x_vals.length > 1) {
    reg1.deg = x_vals.length - 1
    reg1.fit(x_vals, y_vals)
    reg1.display()

    reg2.fit(x_vals, y_vals)
    reg2.display()
  }

  if (pushed) {
    x_vals.pop()
    y_vals.pop()
  }

  drawPoints()

}

function resetPoints() {
  x_vals = [100, width - 100]
  y_vals = [height / 2, height / 2]
}

function mouseOverCanvas() {
  return 0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height
}

function mouseClicked() {
  if (mouseOverCanvas()) {
    x_vals.push(mouseX)
    y_vals.push(mouseY)
  }
}

function touchEnded() {
  mouseClicked()
}

function windowResized() {
  if (windowWidth >= 650)
    resizeCanvas(600, 400)
  else
    resizeCanvas(windowWidth - 20, (windowWidth - 20) * 4 / 6)
}

function drawPoints() {
  noFill()
  strokeWeight(4)
  stroke(30)
  for (let i = 0; i < x_vals.length; i++) {
    ellipse(x_vals[i], y_vals[i], 10)
  }
}

class PolyRegression {

  constructor(deg, c) {
    this.deg = deg
    this.c = c
  }

  fit(xs, ys) {
    const X = L.ones(this.deg + 1, xs.length)
    for (let i = 1; i < X.m; i++)
      for (let j = 0; j < X.n; j++)
        X.set(i, j, X.get(i - 1, j) * xs[j])

    const y = L.mat(ys)
    const Xy = L.mul(X, y)
    const XXt = L.mul(X, L.transpose(X))

    this.coefs = L.solve(XXt, Xy)
  }

  predict(x) {
    x = L.mat(x)
    let y = L.mul(L.ones(x.length), this.coefs[this.deg])
    for (let i = this.deg - 1; i >= 0; i--)
      y = L.add(L.entrywisemul(y, x), this.coefs[i])
    return y
  }

  display() {
    const y = this.predict(plot_range)
    noFill()
    stroke(this.c)
    strokeWeight(3)
    beginShape()
    for (let i = 0; i < plot_range.length; i++)
      vertex(plot_range[i], y[i])
    endShape()
  }

}