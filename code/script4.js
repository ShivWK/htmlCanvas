const canvas2 = document.getElementById("canvas2");
const hero = document.getElementById("hero")
const ctx2 = canvas2.getContext("2d");

canvas2.width = hero.offsetWidth;
canvas2.height = hero.offsetHeight;

let particleArray = [];

window.addEventListener("resize", () => {
    canvas2.height = hero.offsetWidth;
    canvas2.width = hero.offsetHeight;
    mouse.radius = (canvas2.height / 80) * (canvas2.width / 80);
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
    radius: (canvas2.height / 80) * (canvas2.width / 80),
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
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx2.fillStyle = this.color;
        ctx2.fill();
    }

    update(scrollOffset = 0) {
        const drift = scrollOffset * 0.02;
        // boundary check
        if (this.x > canvas2.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if (this.y > canvas2.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // mouse collision check
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            // mouse and particle collides

            if (mouse.x < this.x && this.x < canvas2.width - this.size + 10) {
                //check if particle is in right of the mouse so move it in right
                this.x += 3;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 3;
            }

            if (mouse.y < this.y && this.y < canvas2.height - this.size + 10) {
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
    let numberOfParticles = (canvas2.height * canvas2.width) / 6000 + 180;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((canvas2.width - (size * 2)) - (size * 2)) + (size * 2));
        let y = (Math.random() * ((canvas2.height - (size * 2)) - (size * 2)) + (size * 2));
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = "#0099ffff";

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

            if (distance < (canvas2.width/11) * (canvas2.height)/11) {
                ctx2.strokeStyle = "rgba(24, 117, 179, 0.49)",
                ctx2.lineWidth = 1;
                ctx2.beginPath();
                ctx2.moveTo(particleArray[a].x, particleArray[a].y);
                ctx2.lineTo(particleArray[b].x, particleArray[b].y);
                ctx2.stroke()
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
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    particleHandler(particleArray);
    connect()
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

