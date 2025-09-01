const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight;

let circleParticlesArray = [];
let triangleParticlesArray = [];
let squareParticlesArray = [];
let pentagonParticlesArray = [];
let diamondParticlesArray = [];
let hexagonParticlesArray = [];

let colors = ["rgba(3,252,157,0.6)", "rgba(8, 230, 0, 0.6)", "rgba(252, 69, 3, 0.6)", "rgba(248, 252, 3, 0.6)", "rgba(3, 177, 252, 0.6)", "rgba(252, 3, 3, 0.6)", "rgba(103, 122, 112, 0.6)", "rgba(122, 233, 174, 0.6)", "rgba(255, 255, 255, 0.6)"];

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;

    // circleInit();
    // squareInit();
})

function particleHandler(particleArray) {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
}

class CircleParticles {
    constructor(ctx, x, y, size, color, lineWidth) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.lineWidth = lineWidth;
        this.directionY = 1;
        this.directionX = 1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.02;

        if (this.y > canvas.height + 60) {
            this.directionY = -1;
        } else if (this.y < 0 - 60) {
            this.directionY = 1;
        }

        this.y += this.directionY * 0.3;

        if (this.x > canvas.width + 10) {
            this.directionX = -1;
        } else if (this.x < 0 - 10) {
            this.directionX = 1;
        }

        this.x += this.directionX * Math.random() * canvas.width * 0.0001;
        this.y += drift
    }
}

function circleInit() {
    for (let i = 0; i < 8; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 30 + 8;
        let lineWidth = Math.random() * 10 + 3;

        let color = colors[Math.floor(Math.random() * colors.length)];

        circleParticlesArray.push(new CircleParticles(
            ctx,
            x,
            y,
            size,
            color,
            lineWidth
        ))
    }
}

circleInit();

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
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.l, this.y);
        this.ctx.lineTo(this.x + this.l, this.y + this.b);
        this.ctx.lineTo(this.x, this.y + this.b);

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle;
        this.ctx.closePath();
        this.ctx.stroke();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.002;
        this.lineWidth = 0.5 + Math.sin(Date.now() * 0.0004 + this.x) * 0.5
        this.y += drift
    }
}

const squareInit = () => {
    for (let i = 0; i < 30; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let l = Math.random() * 50 + 10;
        let b = Math.random() * 50 + 10;

        let lineWidth = Math.random() * 50 + 20;

        let color = colors[Math.floor(Math.random() * colors.length)];

        squareParticlesArray.push(new SquareParticles(
            ctx,
            x,
            y,
            l,
            b,
            color,
            lineWidth,
            "round"
        ))
    }
}

squareInit();

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
        this.ctx.beginPath();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x1, this.y1);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.closePath();

        this.ctx.lineJoin = this.joinStyle;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.02;
        this.y += Math.sin(Date.now() * 0.0001 + this.x) * 0.8;
        this.y1 += Math.sin(Date.now() * 0.0001 + this.x) * 0.8;
        this.y2 += Math.sin(Date.now() * 0.0001 + this.x) * 0.8;

        this.y += drift;
        this.y1 += drift;
        this.y2 += drift;
    }
}

const triangleInit = () => {
    for (let i = 0; i < 8; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let h = Math.random() * 40 + 20;
        let b = Math.random() * 40 + 20;

        let x1 = x + b / 2;
        let x2 = x - b / 2;
        let y1 = y + h;
        let y2 = y + h;

        let lineWidth = Math.random() * 3 + 1;

        let color = colors[Math.floor(Math.random() * colors.length)];

        triangleParticlesArray.push(new TriangleParticles(
            ctx, x, y, x1, y1, x2, y2, lineWidth, color
        ))
    }
}

triangleInit();

class PentagonParticles {
    constructor(ctx, x, y, sides, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.s = sides;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo((this.x + this.s/2), this.y + (1.732 * (this.s/2)));
        this.ctx.lineTo((this.x + this.s/2), this.y + this.s + (1.732 * (this.s/2)));
        this.ctx.lineTo((this.x - this.s/2), this.y + this.s + (1.732 * (this.s/2)));
        this.ctx.lineTo((this.x - this.s/2), this.y + (1.732 * (this.s/2)));

        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle
        this.ctx.stroke();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.02;
        this.y += Math.sin(Date.now() * 0.001 + this.x) * 0.2;
        this.y += drift;
    }
}

const pentagonInit = () => {
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * 40 + 10;
        let sides = Math.random() * 5;

        let lineWidth = Math.random() * 40 + 15;

        let color = colors[Math.floor(Math.random() * colors.length)];

        pentagonParticlesArray.push(new PentagonParticles(
            ctx,
            x,
            y,
            radius,
            sides,
            color,
            lineWidth,
            "round"
        ))
    }
}
pentagonInit();

class HexagonParticles {
    constructor(ctx, x, y, sides, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.s = sides;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        if (this.s < 3) return;
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo((this.x + this.s), this.y);
        this.ctx.lineTo((this.x + this.s + this.s/2), (this.y + 1.732 * this.s/2 ));
        this.ctx.lineTo((this.x + this.s), (this.y + 2*(1.732 * this.s/2) ));
        this.ctx.lineTo(this.x, (this.y + 2*(1.732 * this.s/2) ));
        this.ctx.lineTo((this.x - this.s/2), (this.y + 1.732 * this.s/2 ));

        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle
        this.ctx.stroke();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.02;
        this.y += Math.sin(Date.now() * 0.001 + this.x) * 0.2;
        this.y += drift;
    }
}

const hexagonInit = () => {
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let sides = Math.random() * 80 + 20;

        let lineWidth = Math.random() * 30 + 8;

        let color = colors[Math.floor(Math.random() * colors.length)];

        hexagonParticlesArray.push(new HexagonParticles(
            ctx,
            x,
            y,
            sides,
            color,
            lineWidth,
            "round"
        ))
    }
}
hexagonInit();

class DiamondParticles {
    constructor(ctx, x, y, w, h, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
        this.direction = 1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - this.h / 2);
        this.ctx.lineTo(this.x + this.w / 2, this.y);
        this.ctx.lineTo(this.x, this.y + this.h / 2);
        this.ctx.lineTo(this.x - this.w / 2, this.y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle

        this.ctx.stroke();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.002;

        if (this.y > canvas.height + 100) {
            this.direction = -1;
        } else if (this.y < 0 - 100) {
            this.direction = 1;
        }

        this.y += this.direction * 0.38;
        this.y += drift;
    }
}

const diamondInit = () => {
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let h = Math.random() * 40 + 20;
        let w = Math.random() * 15 + 20;

        let lineWidth = Math.random() * 2 + 1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        diamondParticlesArray.push(new DiamondParticles(
            ctx, x, y, w, h, lineWidth, color,
        ))
    }
}
diamondInit();

function animateSquares() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particleHandler(pentagonParticlesArray);
    particleHandler(hexagonParticlesArray)

    particleHandler(squareParticlesArray);
    particleHandler(circleParticlesArray);
    particleHandler(triangleParticlesArray);
    particleHandler(diamondParticlesArray);

    requestAnimationFrame(animateSquares);
}
requestAnimationFrame(animateSquares);
