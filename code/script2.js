let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
}

window.addEventListener("resize", () => {
    cancelAnimationFrame(flowFieldAnimation);

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0)
})

class FlowFieldEffect {
    #ctx;
    #width;
    #height;

    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.strokeStyle = "white";
        this.lastTime = 0;
        this.interval = 100;
        this.timer = 0
    }

    #draw(x, y) {
        const length = 500;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + length, y + length);
        this.#ctx.stroke();
    }

    animate(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (this.timer > this.interval) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.#draw(this.x, this.y);
        } else {
            this.timer += deltaTime
        }

        console.log("Animate")
        requestAnimationFrame(this.animate.bind(this));
    }
}


