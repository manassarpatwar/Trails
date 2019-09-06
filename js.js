window.addEventListener("scroll", function(event){
    var scroll = this.scrollY;
    scroll = scroll+30;
//    console.log(scroll)
    drawAndUpdate(scroll/10.0);
})
var numCircles = 5000;

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
  this.lineWidth = 2;
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
  var centerY = 0; // canvas.height / 2;
  
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


