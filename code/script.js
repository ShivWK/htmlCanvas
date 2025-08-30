const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const particlesArray = [];

// to stop resizing of the rectangle
window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = this.window.innerWidth;
});

const mouse = {
    x: null,
    y: null,
}

function createCircleHandler(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    // createCircle()
}
 
// canvas.addEventListener("click", createCircleHandler);
canvas.addEventListener("mousemove", createCircleHandler);

function createCircle() {
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    ctx.stroke();
}

// console.log(ctx);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill();
    }
}

function init() {
    for(let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

init();
// console.log(particlesArray)

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles()
    requestAnimationFrame(animate); // learn
}

animate()