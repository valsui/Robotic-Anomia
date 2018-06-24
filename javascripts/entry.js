// import Canvas from '../canvas/canvas.js';
// import { writeDataToFile } from '../test_suite/add_data';

document.addEventListener('DOMContentLoaded', () => {
    let canvasEl = document.getElementById("canvas");

    let canvas = new Canvas(canvasEl);
    canvas.animate();
    window.canvas = canvas;


    let clearCanvasButton = document.getElementsByClassName("clear-canvas")[0];
    clearCanvasButton.addEventListener("click", (e) => {
        e.preventDefault();
        canvas.clearCanvas();
    })

    let normalizeCanvasButton = document.getElementsByClassName("normalize-canvas")[0];
    normalizeCanvasButton.addEventListener("click", (e) => {
        e.preventDefault();
        canvas.doSimulationStep();
        canvas.pixels = [];
        canvas.getPixels();
        canvas.draw(canvas.ctx);
    })

    let reduceButton = document.getElementsByClassName("reduce-canvas")[0];
    reduceButton.addEventListener("click", (e) => {
        e.preventDefault();
        canvas.reduce();
    })

    let data = [];

    let flatten = (arr) => {
        return arr.reduce((acc,a) => acc.concat(a));
    }

    let addDataButton = document.getElementById("add-data");
    addDataButton.addEventListener('click', (e) => {
        e.preventDefault();
        let letter = document.getElementById('letter').value;

        let dataPoint = {
            input: flatten(canvas.reducedArr),
            output: {[letter]: 1}
        };

        data.push(JSON.stringify(dataPoint));
        // debugger;
        // writeDataToFile(dataPoint.toString());
    })

    let downloadButton = document.getElementById('download');
    downloadButton.addEventListener('click', (e) => {
        e.preventDefault();
        download(document.getElementById('filename').value, data.toString());
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

        this.canvas.addEventListener("mousedown", (event) => {
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

        window.canvas = canvas;
    }

    getCoords() {
        const that = this;
        const rect = this.canvas.getBoundingClientRect();

        return (event) => {
            // scales the mouse pointer position down by two to account for the canvas being 100x100
            // also normalizes the position by removing the space between the top right 0,0 to the position of the canvas
            that.x =  Math.floor(( event.clientX - rect.left ) / 2);
            that.y =  Math.floor(( event.clientY - rect.top ) / 2);
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
        this.pixels = [];
        this.draw(this.ctx);
    }

    countNeighbors(x,y, start = -1) {
        let count = 0;
        let array = this.array;

        for (let i = start; i < 2; i++) {
            for (let j = start; j < 2; j++) {
                let adjX = x + i;
                let adjY = y + j;

                if (i === 0 && y === 0) {
                    continue;
                } else if (this.outOfBounds(adjX, adjY)) {
                    count += 0;
                } else if (array[adjX][adjY] === 1) {
                    count += 1;
                }
            }
        }

        return count;
    }

    outOfBounds(adjX, adjY) {
        let array = this.array;

        return adjX < 0 || adjX >= array[0].length || adjY < 0 || adjY >= array.length
    }

    doSimulationStep() {
        const birthLimit = 4;
        const deathLimit = 1;
        let array = this.array;
        const newMap = [];

        for (let x = 0; x < array.length; x++) {
            newMap[x] = [];

            for (let y = 0; y < array[0].length; y++) {
                let neighbors = this.countNeighbors(x, y);
                let row = newMap[x];

                if (array[x][y] === 0) {
                    if (neighbors < deathLimit) {
                        row.push(0);
                    } else {
                        row.push(1);
                    }
                } else {
                    if (neighbors > birthLimit) {
                        row.push(0);
                    } else {
                        row.push(1);
                    }
                }
            }
        }

        this.array = newMap;       
        return newMap;
    }

    getPixels() {
       for ( let i = 0; i < this.array.length; i ++ ) {
           for ( let j = 0; j < this.array[i].length; j++ ) {
                if ( this.array[i][j] === 1 ) {
                    this.pixels.push([2 * i, 2 * j]);
                }
           }
       }
    }

    reduce() {
        let array = this.array;
        let newArr = [];

        for ( let i = 0; i < array.length; i += 2 ) {
            let row = [];

            for ( let j = 0; j < array[0].length; j += 2 ) {
                if ( this.countNeighbors(i,j,0) >= 2 ) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }

            newArr.push(row);
        }

        this.reducedArr = newArr;
        console.log(newArr.toString());
        return newArr;
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
