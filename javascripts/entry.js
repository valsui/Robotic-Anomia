// import Canvas from '../canvas/canvas.js';

document.addEventListener('DOMContentLoaded', () => {
    let canvasEl = document.getElementById("canvas");

    let canvas = new Canvas(canvasEl);
    canvas.animate();
    window.canvas = canvas;


    let clearCanvasButton = document.getElementsByClassName("clear-canvas")[0];
    clearCanvasButton.addEventListener("click", (e) => {
        e.preventDefault();
        debugger;
        canvas.clearCanvas();
    })

})

class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.height = 100;
        this.canvas.width = 100;
        this.ctx = canvas.getContext('2d');
        this.array = this.createArray();
        this.x = null;
        this.y = null;
        this.mousedown = false;
        this.pixels = [];

        window.array = this.array;

        document.addEventListener("mousedown", (event) => {
            this.mousedown = true;
            this.canvas.addEventListener("mousemove", this.getCoords())
        })

        this.canvas.addEventListener("mouseenter", (event) => {
            this.canvas.addEventListener("mousemove", this.getCoords())
        })


        document.addEventListener("mouseup", (event) => {
            this.mousedown = false;
            this.canvas.addEventListener("mousemove", this.getCoords())
        })

        this.canvas.addEventListener("mouseout", (event) => {
            this.canvas.removeEventListener("mousemove", this.getCoords())
        })
    }

    getCoords() {
        const that = this;

        return (event) => {
            // scales the mouse pointer position down by two to account for the canvas being 100x100
            // also normalizes the position by removing the space between the top right 0,0 to the position of the canvas
            console.log(event.clientX);
            console.log(event.clientY);
            that.x =  Math.floor(( event.clientX - 695 ) / 2);
            that.y =  Math.floor(( event.clientY - 425 ) / 2);
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

        this.pixels.forEach((pixel) => {
            let [x, y] = pixel
            ctx.beginPath();
            ctx.fillStyle = "black"
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        })

    }

    drawArray() {
        let [x, y] = [this.x, this.y];
         //scales the array down into a 50x50 object
        

        if (this.mousedown === true) {
            if (this.array[x] && this.array[x][y] === 0) {
                this.array[x][y] = 1;
                this.pixels.push([2 * x, 2 * y]) //scales the array matrix by a factor of two in order to account for the canvas being 100x100
            }
        }
    }

    // initializes a 50x50 empty array of 0's.  Zero's correspond to whitespace on the canvas.
    createArray() {
        let array = [];

        for (let i = 0; i < 50; i++) {
            let row = [];

            for (let j = 0; j < 50; j++) {
                row.push(0);
            }

            array.push(row);
        }

        return array;
    }


    // returns a linear 1 x 10000 version of the array.
    linearizeArray() {
        let linearArray = [];

        this.array.forEach((row) => {
            linearArray = linearArray.concat(row);
        })

        return linearArray;
    }

    clearCanvas() {
        this.array = this.createArray();
        debugger
        this.pixels = [];
        this.draw(this.ctx);
    }
}

