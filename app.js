function isElementInViewport(el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function animation(el, class_name) {
    for (var i = 0; i < el.length; i++) {
        if (isElementInViewport(el[i])) {
            el[i].classList.add(class_name);
        }
    }

}

var sections = document.getElementsByClassName('spread');
animation(sections, 'spread-animate');

var noTrails = true;
window.addEventListener("scroll", function (event) {
    scroll = this.scrollY;
    //    console.log(scroll)
    animation(sections, 'spread-animate');
})

var canvas = document.getElementById("canvas");

context = canvas.getContext("2d");
var h = 0;

function resizeCanvas() {
    var w = window.innerWidth;
    if (window.innerHeight > h)
        h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    context.translate(w / 2, h / 2);
};

resizeCanvas();
window.onresize = resizeCanvas;




var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
//context.translate(centerX, centerY);
//var half_degree = Math.PI / 720;
var circle_radius = 2.4;
var offset = 0.01;
var numTrails = canvas.width / 10;
var trails = [];
var minimumRadius = 0.6;

function setup() {
    for (var i = 0; i < numTrails; i++)
        trails.push(new Trail());
}
setup();

function Trail() {
    this.circles = [];
    this.starOpacity = Math.random() + 0.4;
    //    this.R = Math.round(Math.random() * 35 + 220),
    //    this.G = Math.round(Math.random() * 35 + 220),
    //    this.B = Math.round(Math.random() * 35 + 220),
    this.circles.push(new Circle(Math.random() * canvas.width - canvas.width / 2, Math.random() * canvas.height * 2 - canvas.height, circle_radius));
}

function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

Circle.prototype.setX = function (newX) {
    this.x = newX;
}

Circle.prototype.setY = function (newY) {
    this.y = newY;
}

Circle.prototype.setR = function (newR) {
    this.r = newR;
}




function updateStarCoordinates(trail_index) {
    var trail = trails[trail_index];
    var circle = trail.circles[trail.circles.length - 1];
    var radius = Math.sqrt(Math.pow((circle.x - 0), 2) + Math.pow((circle.y - 0), 2));
    var atan = Math.atan2(circle.y, circle.x);
    //    console.log(atan);
    var dTheta = 1 / radius;
    var newX = radius * Math.cos(atan - dTheta);
    var newY = radius * Math.sin(atan - dTheta);

    var prevX = circle.x;
    var prevY = circle.y;
    var prevR = circle.r;
    circle.setX(newX);
    circle.setY(newY);
    circle.setR(prevR);

    updateTrailCoordinates(trail_index, trail.circles.length - 2, prevX, prevY, circle.r - 50 * offset)
}

function updateTrailCoordinates(trail_index, index, x, y, r) {
    if (index >= 0) {
        var circle = trails[trail_index].circles[index];
        var prevX = circle.x;
        var prevY = circle.y;
        var prevR = circle.r;
        circle.setX(x);
        circle.setY(y);
        circle.setR(r);

        updateTrailCoordinates(trail_index, index - 1, prevX, prevY, prevR - offset);
    }
}

function update() {
    context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    for (var i = 0; i < numTrails; i++) {
        if (trails[i].circles[0].r > minimumRadius)
            trails[i].circles.unshift(new Circle(0, 0, 0));
        updateStarCoordinates(i);
        drawTrail(i);
    }
    requestAnimationFrame(update);
}


function drawTrail(trail_index) {
    var trail = trails[trail_index];
    for (var i = 0; i < trail.circles.length; i++) {
        var c = trail.circles[i];
        if ((c.x > canvas.width / 2 || c.x < -canvas.width / 2) &&
            c.y > canvas.height / 2 || c.y < -canvas.height / 2) {
            continue;
        }
        context.beginPath();
        var O;

        if (i != trails[trail_index].circles.length - 1) {
            O = trail.starOpacity - c.r / 20;
            context.rect(c.x - c.r / 2, c.y - c.r / 2, c.r, c.r);
        } else {
            context.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            O = trail.starOpacity;
        }
        //        var color = ['rgba(' + trail.R, trail.G, trail.B, O + ')'].join(',');
        var color = "rgba(255, 255, 255, " + O + ")";
        context.fillStyle = color;
        context.fill();
    }
}
update();
