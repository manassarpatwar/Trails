function isElementInViewport(el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (15 * window.innerHeight / 16 || 15 * document.documentElement.clientHeight / 16) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var sections = document.getElementsByClassName('spread');

function animation(el, class_name) {
    for (var i = 0; i < el.length; i++) {
        if (isElementInViewport(el[i])) {
            el[i].classList.add(class_name);
        }
    }
    
}
animation(sections, 'spread-animate');
window.addEventListener("scroll", function(event){
    var scroll = this.scrollY;
    scroll = scroll+5;
//    console.log(scroll)
    drawAndUpdate(scroll/2.0);
    animation(sections, 'spread-animate');
})
var numCircles = 500;

var canvas = document.getElementById("circle");
var mainContext = canvas.getContext('2d');
var size = 1000;
canvas.width = size * 2;
canvas.height = size * 2;
canvas.style.width = size/2;
canvas.style.height = size/2;
var circ = Math.PI * 2;
var quart = Math.PI / 2;
 
var circles = [];

var Circle = function(radius, width, xPos, yPos) {
  this.speed = Math.random() * 0.001
  this.width = width;
  this.radius = radius;
  this.xPos = xPos;
  this.yPos = yPos;
  this.offset = 0.001;
  this.counter = Math.random() * 400;
  this.lineWidth = 1;
  var R = Math.round(Math.random() * 35 + 190),
      G = Math.round(Math.random() * 35 + 190),
      B = Math.round(Math.random() * 35 + 190),
      O = Math.random() * 1;
  this.color = ['rgba(' + R, G, B, O + ')'].join(',');
};

Circle.prototype.update = function(scroll_pos) {
  this.counter += Math.random() * this.speed;
  
  mainContext.beginPath();
  var curPos = -((circ) * (this.counter/100)) - quart;
  mainContext.arc(this.xPos, 
                  this.yPos, 
                  this.radius, 
                  curPos - scroll_pos*this.offset, 
                  curPos,
                  false);
  mainContext.lineWidth = this.lineWidth;
  mainContext.strokeStyle = this.color;
//  this.offset += 0.00001;
  mainContext.stroke();
};

var setupCircles = function() {
  var centerX = canvas.width / 4;
  var centerY = canvas.height / 4;
  
  for (var n = 0; n < numCircles; n++) {
    var radius = Math.random() * canvas.width;

    var circle = new Circle(radius, 400, centerX, centerY);
    circles.push(circle);
  }
  
  drawAndUpdate(3);
}

var drawAndUpdate = function(scroll_pos) { 
  mainContext.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < circles.length; i++) {
    var myCircle = circles[i];
    myCircle.update(scroll_pos);
  }
}


setupCircles();

animation(sections, 'spread-animate');
