function Graph() {
    this.vertices = [];
    this.edges = [];
}

Graph.prototype.hasVertex = function(val) {
    return this.vertices.some(v => v.value == val);
}

Graph.prototype.addVertex = function(val, x, y) {
    if (this.vertices.some(v => v.value == val))
        console.log(`A vertex with value ${val} already exists.`);
    else {
        var newVertex = new Vertex(val, x, y);
        this.vertices.push(newVertex);
        return newVertex;
    }
}

Graph.prototype.getVertex = function(val) {
    var vertex = this.vertices.find(v => v.value == val);
    if (vertex == undefined) console.log(`Vertex with value ${val} not found.`);
    return vertex;
}

Graph.prototype.remVertex = function(val) {
    var i = this.vertices.findIndex(v => v.value == val);
    if (i < 0) return;
    this.vertices.splice(i, 1);
    var vals = this.vertices.map(v => v.value);
    for (let v of vals) {
        this.remEdge(val, v);
    }
}

Graph.prototype.hasEdge = function(v1, v2) {
    return this.edges.some(
        e => (e[0] == v1 && e[1] == v2) || (e[1] == v1 && e[0] == v2)
    );
}

Graph.prototype.addEdge = function(val1, val2) {
    if (val1 == val2) return;
    var v1 = this.getVertex(val1);
    var v2 = this.getVertex(val2);
    var alreadyAdded = this.hasEdge(v1, v2);

    if (v1 == undefined || v2 == undefined || alreadyAdded) {
        console.log(`Edge from ${val1} to ${val2} could not be added.`);
        return;
    }

    this.edges.push([v1, v2]);
}

Graph.prototype.getEdge = function(val1, val2) {
    return this.edges.find(
        e => (e[0].value == val1 && e[1].value == val2) || (e[1].value == val1 && e[0].value == val2)
    )
}

Graph.prototype.remEdge = function(val1, val2) {
    var i = this.edges.findIndex(
        e => (e[0].value == val1 && e[1].value == val2) || (e[1].value == val1 && e[0].value == val2)
    )
    if (i < 0) return;
    this.edges.splice(i, 1);
}

Graph.prototype.display = function() {
    this.edges.forEach(e => displayEdge(e));
    this.vertices.forEach(v => v.display());
}

function displayEdge(edge) {
    stroke(edgeColor);
    strokeWeight(edgeThickness);
    line(edge[0].pos.x, edge[0].pos.y, edge[1].pos.x, edge[1].pos.y);
}

Graph.prototype.update = function() {
    for (let v1 of this.vertices) {
        for (let v2 of this.vertices) {
            if (v1 == v2) continue;
            if (this.hasEdge(v1, v2)) v1.interactNeighbor(v2);
            else v1.repell(v2);
        }
    }
    for (let v of this.vertices) {
        v.update();
    }
}