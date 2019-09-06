var scroll = 0;
var oldScroll = -1;
window.addEventListener("scroll", function(event){
    oldScroll = scroll;
    scroll = this.scrollY;
    var dir = 1;
    scroll > oldScroll ? dir = 1 : dir = -1;
    
//    console.log(scroll)
    update(dir);
})

var numberOfCircles = 500;

var mainCanvas = document.getElementById("canvas");
var mainContext = mainCanvas.getContext('2d');
var size = 2000;
mainCanvas.width = size * 2;
mainCanvas.height = size * 2;
mainCanvas.style.width = size/2;
mainCanvas.style.height = size/2;
var circ = Math.PI * 2;
var quart = Math.PI / 2;
 
var circles = [];

var Circle = function(r, x, y) {
  this.speed = Math.random() * 0.001
  this.r = r;
  this.x = x;
  this.y = y;
  this.iter = 0;
  this.offset = 0.001;
  this.animationSpeed = 0.02;
  this.counter = Math.random() * 360;
  this.lineWidth = 2;
  var R = Math.round(Math.random() * 55 + 200),
      G = Math.round(Math.random() * 55 + 200),
      B = Math.round(Math.random() * 55 + 200),
      O = Math.random() * 1;
  this.color = ['rgba(' + R, G, B, O + ')'].join(',');
};

Circle.prototype.update = function(dir) {
  mainContext.beginPath();
  var curPos = (circ) * (this.counter) + quart;
  if(curPos < (curPos - this.offset)){
     mainContext.arc(this.x, 
                  this.y, 
                  this.r,
                  curPos,
                  curPos-this.offset, 
                  false);
  }else{
      mainContext.arc(this.x, 
                      this.y, 
                      this.r,
                      curPos-this.offset,
                      curPos, 
                      false);
  }

  mainContext.lineWidth = this.lineWidth;
  mainContext.strokeStyle = this.color;

  mainContext.stroke();
  this.offset = this.offset + dir*this.animationSpeed;
};

var setupCircles = function() {
  var X = window.innerWidth;
  var Y = window.innerHeight;
  
  for (var n = 0; n < numberOfCircles; n++) {
    var radius = Math.random() * (mainCanvas.width+mainCanvas.height)/2;

    var circle = new Circle(radius, X, Y);
    circles.push(circle);
  }    
  
}

var update = function(dir) { 
  mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  for (var i = 0; i < circles.length; i++) {
    var myCircle = circles[i];
    myCircle.update(dir);
  }
}


setupCircles();
