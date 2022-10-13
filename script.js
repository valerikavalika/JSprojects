//colors array
let colors = ['aquamarine', 'lightpink', 'salmon', 'orange', 'yellow', 'rgba(133,122,200)', '#F15025']; 

// get button, title and container from html
let button = document.getElementById('btn');
let container = document.getElementById('container');
let title =document.getElementById('title');

// set default title value
title.innerText = `Background color is: ${colors[0]}`;
//set default container background color 
container.style.backgroundColor = colors[0];

//add eventListener
button.addEventListener('click', changeBackground);
function changeBackground() {
    let colorsIndex = Math.floor(Math.random()*colors.length);
    container.style.backgroundColor = colors[colorsIndex];
    title.innerText = `Background color is: ${colors[colorsIndex]}`;
}