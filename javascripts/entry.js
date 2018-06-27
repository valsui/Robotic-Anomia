// import Canvas from '../canvas/canvas.js';
// import { writeDataToFile } from '../test_suite/add_data';

document.addEventListener('DOMContentLoaded', () => {
    let canvasEl = document.getElementById("canvas");

    let canvas = new Canvas(canvasEl);
    window.canvas = canvas;

    let clearCanvasButton = document.getElementsByClassName("clear-canvas")[0];
    clearCanvasButton.addEventListener("click", (e) => {
        e.preventDefault();
        canvas.clearCanvas();
    })

    let normalizeCanvasButton = document.getElementsByClassName("normalize-canvas")[0];
    normalizeCanvasButton.addEventListener("click", (e) => {
        e.preventDefault();
        // for now, going to use it to look at pixel data
        canvas.doSimulationStep();
        // canvas.draw(canvas.ctx);
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

        data.push(JSON.stringify(dataPoint) + '\n');
        console.log('data added to file')
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
        this.context = canvas.getContext('2d');
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.mousedown = false;
        this.draw = this.draw.bind(this);
        this.array = this.createArray();

        this.canvas.addEventListener("mousedown", (event) => {
            this.mousedown = true;
            this.draw(event);
        })

        this.canvas.addEventListener("mousemove", (event) => {
          this.draw(event);
        });

        document.addEventListener("mouseup", (event) => {
            this.mousedown = false;
            this.context.beginPath();
            // this.canvas.removeEventListener("mousemove", this.draw(event));
        })

    }

  createArray(){
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
  draw(e){
    if(this.mousedown){
        const rect = this.canvas.getBoundingClientRect();
        let x = Math.floor((e.clientX - rect.left) );
        let y = Math.floor((e.clientY - rect.top) );
        let arrX = Math.floor(x / 2);
        let arrY = Math.floor(y / 2);
        this.array[arrX][arrY] = 1;
        this.context.lineTo(x, y);
        this.context.stroke();
        this.context.strokeStyle = "black";
        this.context.lineWidth = 12;
        this.context.arc(x, y, 6, 0, Math.PI*2);
        this.context.fillStyle = "black";
        this.context.fill();
        this.canvas.style.cursor = "pointer";
        this.context.beginPath();
        this.context.moveTo(x, y);
    }
  }

  clearCanvas(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  getPixelData(){
    // let myImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    // let array = [];
    // for(let i = 0; i < myImageData.data.length; i = i + 4){
    //   if(myImageData.data[i] === 0){
    //     array.push(1)
    //   }else{
    //     array.push(0);
    //   }
    // }
    // console.log(myImageData);
    // console.log(array);
    // this.array = array;
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

       let anotherArray = this.cutOut(newArr)
       let returnArray = this.addPadding(25, anotherArray);
       this.reducedArr = returnArray;
       return returnArray;
   }

   cutOut(array){
     let top  = array.length;
     let bottom = 0;
     let left = array.length;
     let right = 0;
     // This part finds the margins of the box in order to cut it out
     for(let i = 0; i < array.length; i++){
       for(let j = 0; j < array[i].length; j++){
         if(array[i][j] === 1){
           if(i < top){
             top = i;
           }
           if(i > bottom){
             bottom = i;
           }
           if(j < left){
             left = j;
           }
           if(j > right){
             right = j
           }
         }
       }
     }
     let anotherArray = [];
     for(let i = top; i < bottom; i++){
       anotherArray.push(array[i])
     }
     for(let i = 0; i < anotherArray.length; i++){
       for(let j = 0; j < left; j++){
         anotherArray[i].shift();
       }
       for(let k = right; k < 25; k++){
         anotherArray[i].pop();
       }
     }
     return anotherArray;
   }
   addPadding(size, array){
     let width = size - array[0].length;
     let height = size - array.length;
     let returnArray = this.addTopBottomPadding(height, JSON.parse(JSON.stringify(array)));
     return this.addRightLeftPadding(width, JSON.parse(JSON.stringify(returnArray)));
   }
   addTopBottomPadding(height, array){
     let tempArray = [];
     for(let i = 0; i < array[0].length; i++){
       tempArray.push(0);
     }
     // In case of odd numbers, add extra padding to bottom.
     if(height % 2 !== 0){
      array.push(tempArray);
     }
     let padding = Math.floor(height / 2);
     for(let i = 0; i < padding; i++){
       array.unshift(tempArray);
       array.push(tempArray);
     }
     return array;
   }
   addRightLeftPadding(width, array){
     // Add extra padding at end in case of odd numbers
     if(width % 2 !== 0){
       for(let i = 0; i < 25; i++){
         array[i].push(0);
       }
     }
     let padding = Math.floor(width / 2);
     for(let i = 0; i < 25; i++){
       for(let j = 0; j < padding; j++){
         array[i].unshift(0);
         array[i].push(0);
       }
     }
     return array;
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
