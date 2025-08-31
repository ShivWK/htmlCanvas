const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particlesArray = [];

class CircleParticles {
    constructor(ctx, x, y, size, color, lineWidth) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }

    // update() {
    // }
}

class SquareParticles {
    constructor(ctx, x, y, l, b, color, lineWidth, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.l = l;
        this.b = b;
        this.color = color;
        this.lineWidth = lineWidth;
        this.joinStyle = joinStyle;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(ix, iy);
        ctx.lineTo(ix + l, iy);
        ctx.lineTo(ix + l, iy + b);
        ctx.lineTo(ix, iy + b);

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = joinStyle;
        ctx.closePath();
        ctx.stroke();
    }

    // update() {
    // }
}

class TriangleParticles {
    constructor(ctx, x, y, x1, y1, x2, y2, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();

        ctx.lineJoin = this.joinStyle;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }

    // update() {
    // }
}


class PolygonParticles {
    constructor(ctx, x, y, radius, sides, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        if (this.sides < 3) return;
        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
            let angle = (i * 2 * Math.PI) / this.sides;
            let px = x + radius * Math.cos(angle);
            let py = y + radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = joinStyle
        ctx.stroke();
    }

    // update() {
    // }
}

class DiamondParticles {
    constructor(x, y, w, h, lineWidth, color, joinStyle = "miter") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.h / 2);
        ctx.lineTo(this.x + this.w / 2, this.y);
        ctx.lineTo(this.x, this.y + this.h / 2);
        ctx.lineTo(this.x - this.w / 2, this.y);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.lineJoin = this.joinStyle

        ctx.stroke();
    }

    // update() {
    // }
}

// Particle.prototype.drawCircle = function (lineWidth, color, ix, iy, size) {
//     ctx.beginPath();
//     ctx.arc(ix, iy, size, 0, Math.PI * 2, false);
//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth
//     ctx.stroke();
// }


// Particle.prototype.drawTriangle = function (ix, iy, x1, y1, x2, y2, lineWidth, color, joinStyle = "miter") {
//     ctx.beginPath();

//     ctx.moveTo(ix, iy)
//     ctx.lineTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.closePath();

//     ctx.lineJoin = joinStyle;
//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth
//     ctx.stroke();
// }


// Particle.prototype.drawSquare = function (ix, iy, l, b, lineWidth, color, joinStyle = "miter") {
//     ctx.beginPath();

//     ctx.moveTo(ix, iy);
//     ctx.lineTo(ix + l, iy);
//     ctx.lineTo(ix + l, iy + b)
//     ctx.lineTo(ix, iy + b);

//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth
//     ctx.lineJoin = joinStyle
//     ctx.closePath();

//     ctx.stroke()
// }


// Particle.prototype.drawPolygon = function (x, y, radius, sides, lineWidth, color, joinStyle = "miter") {
//     if (sides < 3) return;
//     ctx.beginPath();
//     for (let i = 0; i < sides; i++) {
//         let angle = (i * 2 * Math.PI) / sides;
//         let px = x + radius * Math.cos(angle);
//         let py = y + radius * Math.sin(angle);
//         if (i === 0) ctx.moveTo(px, py);
//         else ctx.lineTo(px, py);
//     }
//     ctx.closePath();
//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth;
//     ctx.lineJoin = joinStyle
//     ctx.stroke();
// };


// Particle.prototype.drawDiamond = function (x, y, w, h, lineWidth, color, joinStyle = "miter") {
//     ctx.beginPath();
//     ctx.moveTo(x, y - h / 2);
//     ctx.lineTo(x + w / 2, y);
//     ctx.lineTo(x, y + h / 2);
//     ctx.lineTo(x - w / 2, y);
//     ctx.closePath();
//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth;
//     ctx.lineJoin = joinStyle

//     ctx.stroke();
// };


// const circles = new Particle(1, 1);
// const triangles = new Particle(1, 1);
// const squares = new Particle(1, 1);
// const polygons = new Particle(1, 1);
// const diamonds = new Particle(1, 1);

circles.drawCircle(8, "rgb(94,90,90,0.4)", 100, 100, 25);

triangles.drawTriangle(200, 200, 225, 240, 175, 240, 4, "rgba(12,90,135,0.8)");
polygons.drawPolygon(400, 400, 80, 6, 5, "red", "round");

squares.drawSquare(300, 300, 50, 50, 4, "rgba(12,90,135,0.8)", "round");

polygons.drawPolygon(500, 500, 30, 5, 5, "rgba(28, 173, 67, 0.5)");

diamonds.drawDiamond(400, 40, 40, 45, 3, "red");

squares.drawSquare(300, 100, 120, 120, 6, "rgba(12,90,255,0.8)", "round")
