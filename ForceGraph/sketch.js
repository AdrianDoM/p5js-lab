var graph;

var V = 6;
var E = 12;

var posR = 200;
var vertexRadius = 30;
var edgeThickness = 3;
var edgeColor = 0;
var graphR = 100;
var forceScaling = 1;
var velDamping = .9;
var col = '#0e2f44';

var maxVel = 10;
var maxAcc = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  graph = new Graph();
  for (var i = 0; i < V; i++) graph.addVertex(i);
  for (var i = 0; i < E; i++) {
    var val1 = floor(random(V));
    var val2 = floor(random(V));
    while (val1 == val2) val2 = floor(random(V));
    graph.addEdge(val1, val2);
  }
  
  vertex0 = graph.getVertex(1);
}

function draw() {
  background('#f59563');
  graph.update();
  graph.display();
}

function mouseDragged() {
  var mousePos = createVector(mouseX, mouseY);
  for (let v of graph.vertices)
    if (v.isOver(mousePos))
      v.forceMove(mousePos);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}