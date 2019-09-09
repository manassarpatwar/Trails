var canvas = document.getElementById("canvas");

context = canvas.getContext("2d");
var w = 0;
var h = 0;
function resizeCanvas() {
    canvas.width = window.innerWidth*2;
    canvas.height = window.innerHeight*2;
    w = canvas.width;
    h = canvas.height;
    canvas.style.width = w/2 + "px";
    canvas.style.height = h/2 + "px";
    context.translate(w / 2, h / 2);
};

resizeCanvas();
window.onresize = resizeCanvas;

var half_degree = Math.PI / 180;

var offset = 0.05;
var star_radius = 1.5;
var trails = [];
var numTrails = 200;
var speed = Math.PI/400;

function setup(){
    for(var i = 0; i < numTrails; i++){
        var radius =  Math.sqrt(Math.pow(Math.random()*w - w/2 , 2) + Math.pow(Math.random()*h - h/2, 2));
        trails.push(new Trail(radius))
    }
}
setup();

function Trail(radius){
    this.arcs = [];
    this.arc_width = 2;
    this.radius = radius;
    this.st_ang = Math.random()*Math.PI*2;
    this.starOpacity = (Math.random()+0.5)/1.6667;
}

function Arc(start_angle, end_angle, width, radius) {
    this.start_angle = start_angle;
    this.end_angle = end_angle;
    this.width = width;
    this.radius = radius;
}

//window.addEventListener("scroll", function () {
function animate(){
    context.clearRect(-w/ 2, -h/ 2, w, h);
    for(var i = 0; i < numTrails; i++){
        if (trails[i].arc_width >= 0) {
//            var st_ang = Math.random()*Math.PI*2;
            trails[i].arcs.push(new Arc(trails[i].st_ang, trails[i].st_ang+half_degree, trails[i].arc_width, trails[i].radius));
        }
        changeStarParams(i, trails[i].arcs.length - 1);
        drawTrails(i);
        trails[i].arc_width -= offset;
    }
    requestAnimationFrame(animate);
}
animate();

function changeStarParams(trail_index, arc_index) {
    if (arc_index >= 0) {
        var arc = trails[trail_index].arcs[arc_index];
        arc.end_angle = arc.start_angle;
        arc.start_angle -= speed;
        changeStarParams(trail_index, arc_index - 1);
    }
}

function drawTrails(trail_index) {
    var trail = trails[trail_index];
    var arc = trail.arcs[0];
    var X = arc.radius * Math.cos(arc.start_angle);
    var Y = arc.radius * Math.sin(arc.start_angle);
    context.beginPath();
    context.arc(X, Y, star_radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 255, 255, " + trail.starOpacity + ")";
    context.fill();
    for (var i = 0; i < trail.arcs.length; i++) {
        var arc = trail.arcs[i];
        context.beginPath();
        context.arc(0, 0, arc.radius, arc.start_angle, arc.end_angle);
        context.lineWidth = arc.width;
        var O = trail.starOpacity - arc.width/20;
        var color = "rgba(255, 255, 255, " + O + ")";
        context.strokeStyle = color;
        context.stroke();
    }
}
