const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let particleArray = [];

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    mouse.radius = (canvas.height / 90) * (canvas.width / 90);
    // init();
});

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 90) * (canvas.width / 90),
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.02;
        // boundary check
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // mouse collision check
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            // mouse and particle collides

            if (mouse.x < this.x && this.x < canvas.width - this.size + 10) {
                //check if particle is in right of the mouse so move it in right
                this.x += 3;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 3;
            }

            if (mouse.y < this.y && this.y < canvas.height - this.size + 10) {
                this.y += 3;
            }

            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 3;
            }
        }

        // if it is not colliding then move it by its direction value;

        this.x += this.directionX;
        this.y += this.directionY;

        this.y += drift;
    }
}

function init() {
    let numberOfParticles = (canvas.height * canvas.width) / 6000 + 150;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((canvas.width - (size * 2)) - (size * 2)) + (size * 2));
        let y = (Math.random() * ((canvas.height - (size * 2)) - (size * 2)) + (size * 2));
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = "#ff5200";

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
init()

function connect() {
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = 0; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = dx*dx + dy*dy;

            if (distance < (canvas.width/11) * (canvas.height)/11) {
                ctx.strokeStyle = "rgba(255, 81, 0, 0.49)",
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke()
            }
         }
    }
}

function particleHandler(particleArray) {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleHandler(particleArray);
    connect()
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

