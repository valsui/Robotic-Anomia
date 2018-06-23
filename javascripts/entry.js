// import Canvas from '../canvas/canvas.js';

document.addEventListener('DOMContentLoaded', () => {
    let canvasEl = document.getElementById("canvas");

    let canvas = new Canvas(canvasEl);
    canvas.animate();
})

class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.width = 100;
        this.ctx.height = 100;
        this.array = this.createArray();
        this.x = null;
        this.y = null;
        this.mousedown = false;
        this.pixels = [];
        let rect = canvas.getBoundingClientRect();

        window.array = this.array;

        this.canvas.addEventListener("mousedown", (event) => {
           this.mousedown = true;
           this.canvas.addEventListener("mousemove", this.getCoords())
        })


        this.canvas.addEventListener("mouseup", (event) => {
            this.mousedown = false;
            this.canvas.addEventListener("mousemove", this.getCoords())
        })

        this.canvas.addEventListener("mouseout", (event) => {
            this.mousedown = false;
            this.canvas.removeEventListener("mousemove", this.getCoords())
        })
    }

    getCoords() {
        const that = this;

        return (event) => { 
            that.x = event.clientX - 405;
            that.y = event.clientY - 435;
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.draw(this.ctx);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, 100, 100);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 100, 100);

        //iterates through each element in the array and generates a pixel for each

        this.drawArray();

        // for (let i = 0; i < this.array.length; i++) {
        //     for (let j = 0; j < this.array[i].length; j++) {
        //         if (this.array[i][j] === 0 ) {
        //             ctx.beginPath();
        //             ctx.fillStyle = "white";
        //             ctx.fillRect(i, j, 1, 1);
        //             ctx.fill();
        //         } else if (this.array[i][j] === 1 ) {
        //             ctx.beginPath();
        //             ctx.fillStyle = "black"
        //             ctx.fillRect(i, j, 5, 5);
        //             ctx.fill();
        //         }
        //     }
        // }

        this.pixels.forEach ((pixel) => {
            let [x,y] = pixel
            ctx.beginPath();
            ctx.fillStyle = "black"
            ctx.fillRect(3 * x, 1.5 * y, 30, 15);
            ctx.fill();
        })

    }

    drawArray() {
        let [x, y] = [this.x, this.y];

        if ( this.mousedown === true ) {
            if (this.array[x][y] === 0) {
                this.array[x][y] = 1;
                this.pixels.push([x,y])
            }
        }
    }

    createArray() {
        let array = [];

        for (let i = 0; i < 100; i++) {
            let row = [];

            for (let j = 0; j < 100; j++) {
                row.push(0);
            }

            array.push(row);
        }

        return array;
    }
}
