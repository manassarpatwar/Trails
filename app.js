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

window.addEventListener("scroll", function (event) {
    animation(sections, 'spread-animate');
})

var canvas = document.getElementById("canvas");

context = canvas.getContext("2d");
function resizeCanvas() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    context.translate(w/2, h/2);
};

// Webkit/Blink will fire this on load, but Gecko doesn't.
window.onresize = resizeCanvas;

// So we fire it manually...
resizeCanvas();


var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
//context.translate(centerX, centerY);
var half_degree = Math.PI / 720;
var circle_radius = 2.5;
var offset = 0.008;
var numCircles = 50;
var circles = [];
while (circles.push([]) < numCircles);

function setup() {
    for (var i = 0; i < numCircles; i++)
        circles[i].push(new Circle(Math.random() * canvas.width - canvas.width/2, Math.random() * canvas.height - canvas.height/2, circle_radius));
}
setup();


function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

Circle.prototype.setXYR = function (newX, newY, newR) {
    this.x = newX;
    this.y = newY;
    this.r = newR;
}



function updateStarCoordinates(circle_index) {
    var circle = circles[circle_index][circles[circle_index].length - 1];
    var radius = Math.sqrt(Math.pow((circle.x - 0), 2) + Math.pow((circle.y - 0), 2));
    var atan = Math.atan2(circle.y, circle.x);
//    console.log(atan);
    var newX = radius * Math.cos(atan - half_degree);
    var newY = radius * Math.sin(atan - half_degree);

    var prevX = circle.x;
    var prevY = circle.y;
    circle.setXYR(newX, newY, circle.r);

    updateTrailCoordinates(circle_index, circles[circle_index].length - 2, prevX, prevY, circle.r - 50*offset)
}

function updateTrailCoordinates(circle_index, index, x, y, r) {
    if (index >= 0) {
        var circle = circles[circle_index][index];
        var prevX = circle.x;
        var prevY = circle.y;
        var prevR = circle.r;
        circle.setXYR(x, y, r);
        updateTrailCoordinates(circle_index, index - 1, prevX, prevY, prevR - offset);
    }
}

function update() {
    context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    for (var i = 0; i < numCircles; i++) {
        if (circles[i][0].r > 0.1)
            circles[i].unshift(new Circle(0, 0, 0));

        updateStarCoordinates(i);
        drawTrail(i);
    }

    requestAnimationFrame(update);
}

//window.addEventListener("scroll", function () {
//    update();
//})


function drawTrail(circle_index) {
    for (var i = 0; i < circles[circle_index].length; i++) {
        var c = circles[circle_index][i];
        context.beginPath();
        context.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        var R = Math.round(Math.random() * 35 + 190),
            G = Math.round(Math.random() * 35 + 190),
            B = Math.round(Math.random() * 35 + 190),
            O = c.r - (c.r*0.8);
        var color = ['rgba(' + R, G, B, O + ')'].join(',');
        context.fillStyle = color;
        context.fill();
    }
}

update();