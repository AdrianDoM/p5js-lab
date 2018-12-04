var graph;

var initDisp = 200;
var vertexRadius = 30;
var edgeThickness = 3;
var edgeColor = 0;
var graphR = 100;
var forceScaling = 1;
var velDamping = .9;
var col = '#0e2f44';

var maxVel = 10;
var maxAcc = 1;

var addVertex_input, remVertex_input;
var addEdge_input1, addEdge_input2, remEdge_input;

function setup() {
  createCanvas(windowWidth, windowHeight);

  addVertex_input = select('#addVertex_input');
  remVertex_input = select('#remVertex_input');
  addEdge_input1 = select('#addEdge_input1');
  addEdge_input2 = select('#addEdge_input2');
  remEdge_input = select('#remEdge_input');

  graph = new Graph();

  graph.addVertex(0, width/2 - 50, height/2);
  addOption(remVertex_input, 0);
  graph.addVertex(1, width/2 + 50, height/2);
  addOption(remVertex_input, 1);
  graph.addEdge(0, 1);
  addOption(remEdge_input, '(0,1)');
}

function draw() {
  background('#82b74b');
  graph.update();
  graph.display();
}

function mouseDragged() {
  var mousePos = createVector(mouseX, mouseY);
  for (let v of graph.vertices)
    if (v.isOver(mousePos))
      v.forceMove(mousePos);
}

function addOption(sel, val) {
  var opt = createElement('option', val.toString());
  opt.attribute('id', val.toString());
  opt.parent(sel);
}

function remOption(val) {
  if (val == '') return;
  var opt = select(`#${val}`);
  opt.remove();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// Input functions

function inputAddVertex() {
  var val = addVertex_input.value();
  graph.addVertex(val, width/2 + random(-initDisp, initDisp), height/2 + random(-initDisp, initDisp));
  addOption(remVertex_input, val);
}

function inputRemVertex() {
  var val = remVertex_input.value();
  remOption(val);
  graph.remVertex(val);
}

function inputAddEdge() {
  var val1 = addEdge_input1.value();
  var val2 = addEdge_input2.value();
  if (!graph.hasVertex(val1)) {
    graph.addVertex(val1, width/2 + random(-initDisp, initDisp), height/2 + random(-initDisp, initDisp));
    addOption(remVertex_input, val1);
  }
  if (!graph.hasVertex(val2)) {
    graph.addVertex(val2, width/2 + random(-initDisp, initDisp), height/2 + random(-initDisp, initDisp));
    addOption(remVertex_input, val2);
  }
  graph.addEdge(val1, val2);
  addOption(remEdge_input, `(${val1},${val2})`);
}

function inputRemEdge() {
  var e = remEdge_input.value();
  remOption(e);
  e = e.slice(1,-1);
  vals = e.split(',');
  val1 = vals[0];
  val2 = vals[1];
  graph.remEdge(val1, val2);
}