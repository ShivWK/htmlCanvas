const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particlesArray = [];

function Particle(directionX, directionY) {
    this.directionX = directionX;
    this.directionY = directionY;
}

Particle.prototype.drawCircle = function(lineWidth, color, ix, iy, size) {
    ctx.beginPath();
    ctx.arc(ix, iy, size, 0, Math.PI * 2, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth
    ctx.stroke();
}

Particle.prototype.drawTriangle = function(ix, iy, x1, y1, x2, y2, lineWidth, color, joinStyle = "miter") {
    ctx.beginPath();

    ctx.moveTo(ix, iy)
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();

    ctx.lineJoin = joinStyle;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth
    ctx.stroke();
}

Particle.prototype.drawSquare = function(ix, iy, l, b, lineWidth, color, joinStyle = "miter") {
    ctx.beginPath();

    ctx.moveTo(ix, iy);
    ctx.lineTo(ix + l, iy);
    ctx.lineTo(ix + l, iy + b)
    ctx.lineTo(ix, iy + b);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth
    ctx.lineJoin = joinStyle
    ctx.closePath();

    ctx.stroke()
}

Particle.prototype.drawHexagon = function(ix, iy, side, lineWidth, color, joinStyle = "miter") {
    ctx.beginPath();

    ctx.moveTo(ix, iy);
    ctx.lineTo(ix + side, iy);
    ctx.lineTo(ix + l, iy + b)
    ctx.lineTo(ix, iy + b);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth
    ctx.lineJoin = joinStyle
    ctx.closePath();

    ctx.stroke()
}

const circles = new Particle(1, 1);
const triangles = new Particle(1, 1);
const squares = new Particle(1, 1);

circles.drawCircle(8, "rgb(94,90,90,0.4)", 100, 100, 25);

triangles.drawTriangle(200, 200, 225, 240, 175, 240, 2, "rgba(12,90,135,0.8)");

squares.drawSquare(300, 300, 50, 50, 2, "rgba(12,90,135,1)", "round")
