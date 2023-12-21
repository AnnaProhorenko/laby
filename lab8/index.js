const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
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

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let lineWidth = 1;
lineWidthLabel.textContent = `Толщина линии: ${lineWidth}`;
lineWidthRange.addEventListener('input', () => {
    lineWidth = parseInt(lineWidthRange.value);
    lineWidthLabel.textContent = `Толщина линии: ${lineWidth}`;
});

let lineColor = "#000000";
lineColorLabel.textContent = `Цвет линии: ${lineColor}`;
lineColorInput.addEventListener('input', () => {
    lineColor = lineColorInput.value;
    lineColorLabel.textContent = `Цвет линии: ${lineColor}`;
});

let fillColor = "#ffffff";
fillColorLabel.textContent = `Цвет заливки: ${fillColor}`;
fillColorInput.addEventListener('input', () => {
    fillColor = fillColorInput.value;
    fillColorLabel.textContent = `Цвет заливки: ${fillColor}`;
});

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.clientX - canvas.getBoundingClientRect().left;
    startY = e.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    const shape = document.querySelector('input[name="shape"]:checked').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = lineColor; 
    ctx.fillStyle = fillColor;
    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(e.clientX - canvas.getBoundingClientRect().left - startX, 2) + Math.pow(e.clientY - canvas.getBoundingClientRect().top - startY, 2));
        drawCircle(startX, startY, radius);
    } else if (shape === 'rectangle') {
        const width = e.clientX - canvas.getBoundingClientRect().left - startX;
        const height = e.clientY - canvas.getBoundingClientRect().top - startY;
        drawRectangle(startX, startY, width, height);
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    if (pencilPoints.length > 0) {
        pencilPoints = [];
    }
});

function drawCircle(cx, cy, radius) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill(); 
    ctx.stroke();
}

function drawRectangle(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill(); 
    ctx.stroke();
}