var _ = require('lodash');

// using lodash
var array = [1, 2, 3, 4, 5, 6, 7, 8];
console.log('answer: ', _.without(array, 3, 4));

var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var button = document.querySelector('button');

function randomGenerator() {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6-x.length);
    var z = "000000";
    var z1 = z.substring(0,y);
    var randomColor = "#" + z1 + x;
	return randomColor;
}

function randomColor() {
    color1.value = randomGenerator();
    color2.value = randomGenerator();
    setGradient();
}

function setGradient() {
    console.log(color1.value);
	body.style.background =
	"linear-gradient(to right, "
	+ color1.value
	+ ", "
	+ color2.value
	+ ")";

	css.textContent = body.style.background + ";";
}

body.addEventListener("onload", setGradient());

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

button.addEventListener("click", randomColor);