function Vertex(val, x, y) {
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.value = val;
}

Vertex.prototype.display = function() {
    noStroke(0);
    fill(col);
    ellipseMode(RADIUS);
    ellipse(this.pos.x, this.pos.y, vertexRadius, vertexRadius);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.value.toString(), this.pos.x, this.pos.y);
}

Vertex.prototype.update = function() {
    this.acc.limit(maxAcc);
    this.vel.add(this.acc);
    this.vel.mult(velDamping);
    this.vel.limit(maxVel);
    this.pos.add(this.vel);
    this.acc.set(0,0);
}

Vertex.prototype.interactNeighbor = function(neighbor) {
    var diff = p5.Vector.sub(neighbor.pos, this.pos);
    var dist = diff.mag();
    dist = dist > 0 ? dist : 0.3;
    var force = log(dist / graphR);
    diff.setMag(force * forceScaling);
    this.acc.add(diff);
}

Vertex.prototype.repell = function(vertex) {
    var diff = p5.Vector.sub(vertex.pos, this.pos);
    var dist = diff.mag();
    dist = dist > 0 ? dist : 0.3;
    if (dist >= graphR) return;
    var force = log(dist / graphR);
    diff.setMag(force * forceScaling);
    this.acc.add(diff);
}

Vertex.prototype.edges = function() {
    var center   = createVector(width / 2, height / 2);
    center.sub(this.pos);
    var isOutside = this.pos.x < 0 || this.pos.x > width
                 || this.pos.y < 0 || this.pos.y > height;
    if (isOutside)
        this.acc.add(center);
}

Vertex.prototype.isOver = function(mousePos) {
    var dist = p5.Vector.sub(this.pos, mousePos).mag();
    return dist <= vertexRadius;
}

Vertex.prototype.forceMove = function(mousePos) {
    var newVel = p5.Vector.sub(mousePos, this.pos);
    this.pos = mousePos;
    this.vel.set(newVel);
    this.acc.set(0,0);
}