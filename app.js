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

var randomQuotes = document.getElementsByClassName("random-splash");
var rand = Math.round(Math.random() * (randomQuotes.length - 1));
randomQuotes[rand].style.display = "block";

var sections = document.getElementsByClassName('spread');
animation(sections, 'spread-animate');

window.addEventListener("scroll", function (event) {
    scroll = this.scrollY;
    //    console.log(scroll)
    animation(sections, 'spread-animate');
})

var bg = document.getElementById("bg");


var backgroundGradients = ["linear-gradient(to bottom, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)",
    "linear-gradient(to top, #09203f 0%, #537895 100%)",
    "linear-gradient(to top, #f43b47 0%, #453a94 100%)",
    "linear-gradient(to top, #3ab5b0 0%, #3d99be 31%, #56317a 100%)",
    "linear-gradient(to bottom, #243949 0%, #517fa4 100%)",
    "linear-gradient(to bottom, #3d3393 0%, #2b76b9 70%, #2cacd1 100%)",
    "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
    "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
    "radial-gradient(black 0%, black 100%)"]
var rand = Math.round(Math.random() * (backgroundGradients.length - 1));
bg.style.backgroundImage = backgroundGradients[rand];

