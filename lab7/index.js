
const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
const svg = document.getElementById('svg');
const shapeSelector = document.getElementsByName('shape');
const clearButton = document.getElementById('clearCanvas');
const lineWidthRange = document.getElementById('lineWidth');
const lineWidthLabel = document.getElementById('lineWidthLabel');
const lineColorInput = document.getElementById('lineColor');
const lineColorLabel = document.getElementById('lineColorLabel');
const fillColorInput = document.getElementById('fillColor');
const fillColorLabel = document.getElementById('fillColorLabel');

let drawing = false;
let startX, startY;
let pencilPoints = [];
let currentShape;

clearButton.addEventListener('click', () => {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
});

lineWidthRange.addEventListener('input', () => {
    lineWidthLabel.textContent = `Толщина линии: ${lineWidthRange.value}`;
});

lineColorInput.addEventListener('input', () => {
    lineColorLabel.textContent = `Цвет линии: ${lineColorInput.value}`;
});

fillColorInput.addEventListener('input', () => {
    fillColorLabel.textContent = `Цвет заливки: ${fillColorInput.value}`;
});

svg.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.clientX - svg.getBoundingClientRect().left;
    startY = e.clientY - svg.getBoundingClientRect().top;
    if (currentShape === 'circle'){ 
        svg.appendChild(circle);
    } else if(currentShape === 'rectangle'){
        svg.appendChild(rect);
    }
});

svg.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    currentShape = document.querySelector('input[name="shape"]:checked').value;

    if (currentShape === 'circle') {
        const radius = Math.sqrt(Math.pow(e.clientX - svg.getBoundingClientRect().left - startX, 2) + Math.pow(e.clientY - svg.getBoundingClientRect().top - startY, 2));
        drawCircle(startX, startY, radius);
    } else if (currentShape === 'rectangle') {
        const width = Math.abs(e.clientX - svg.getBoundingClientRect().left - startX);
        const height = Math.abs(e.clientY - svg.getBoundingClientRect().top - startY);
        drawRectangle(startX, startY, width, height);
    }
});

svg.addEventListener('mouseup', () => {
    drawing = false;
});

function drawCircle(cx, cy, radius) {
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", radius);
    circle.setAttribute("stroke", lineColorInput.value);
    circle.setAttribute("stroke-width", lineWidthRange.value);
    circle.setAttribute("fill", fillColorInput.value);
   
}

function drawRectangle(x, y, width, height) {
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("stroke", lineColorInput.value);
    rect.setAttribute("stroke-width", lineWidthRange.value);
    rect.setAttribute("fill", fillColorInput.value);
}