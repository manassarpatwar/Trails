var canvas = document.getElementById("canvas");

context = canvas.getContext("2d");
var w = 0;
var h = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    w = canvas.width;
    h = canvas.height;
    canvas.style.width = w / 2 + "px";
    canvas.style.height = h / 2 + "px";
    context.translate(w / 2, h / 2);
};

resizeCanvas();

window.addEventListener("resize", function () {
    resizeCanvas()
})

function clearCanvas() {
    context.clearRect(-w / 2, -h / 2, w, h);
}


const TRAILS = [];
const NUMTRAILS = w/10;
const SPEED = 1 / 4;

for (let i = 0; i < NUMTRAILS; i++)
    TRAILS.push(new Trail());

function Trail() {
    this.start = Math.random() * Math.PI * 2;
    this.end = this.start;
    this.radius = Math.random() * 0.6*Math.max(w,h);
    this.opacity = Math.random() / 2 + 0.5;
}

function Vector(x, y){
    this.x = x;
    this.y = y;
}


Trail.prototype.getStartCoords = function(){
    return new Vector(this.radius * Math.cos(this.start), this.radius * Math.sin(this.start));
} 

Trail.prototype.getEndCoords = function(){
    return new Vector(this.radius * Math.cos(this.end), this.radius * Math.sin(this.end));
} 

Trail.prototype.drawTrail = function (dir=1) {

    let g = context.createLinearGradient(this.getEndCoords().x, this.getEndCoords().y, this.getStartCoords().x, this.getStartCoords().y);
    g.addColorStop(0, 'rgba(255,255,255,' + this.opacity + ')');
    g.addColorStop(1, 'rgba(255,255,255,0)');

    context.beginPath()
    context.arc(0, 0, this.radius, this.start, this.end);
    context.lineWidth = 3;
    context.strokeStyle = g;
    context.stroke();

    context.beginPath()
    context.arc(this.getEndCoords().x, this.getEndCoords().y, 3, 0, Math.PI * 2);
    context.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
    context.fill();

    this.end += dir*Math.PI / 180 * SPEED;
    if (this.end > this.start + Math.PI / 4)
        this.start += dir*Math.PI / 180 * SPEED;
}

function drawTrails(dir) {
    for (let t of TRAILS)
        t.drawTrail(dir);
}

function update(){
    clearCanvas();
    drawTrails();
    requestAnimationFrame(update);
}

update();