import brain from 'brain.js';
var net = new brain.NeuralNetwork();
var config = {
    binaryThresh: 0.5,
    hiddenLayers: [3],
    activation: 'sigmoid'
};

const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const matrix = document.getElementById('matrix');
const save = document.getElementById('save');
const output = document.getElementById('output');
const train = document.getElementById('train');
const test = document.getElementById('test');

// canvas.width = 300;
canvas.width = 1000;
canvas.height = 300;
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

const createArray = () => {
    let array = [];

    for (let i = 0; i <= canvas.width / 10 ; i++) {
        let row = [];
        for (let j = 0; j <= canvas.height / 10; j++) {
            row.push(0);
        }
        array.push(row);
    }
    return array;
}

let dragging = false;
let matrixOn = false;
var array = createArray();
var trainData = [];

const generalizeArr = (x,y) => {
  array[x][y] = 1;
  array[x+1][y+1] = 1;
  array[x][y+1] = 1;
  array[x+1][y] = 1;

  if (array[x-2][y] === 1) {
    array[x-1][y] = 1;
  }
  if (array[x][y-2] === 1) {
    array[x][y-1] = 1;
  }
}

const draw = (e) =>{
  if (dragging) {
    context.lineTo(e.clientX, e.clientY);
    var x = Math.round(e.clientX / 10);
    var y = Math.round(e.clientY / 10);
    generalizeArr(x, y);
    context.stroke();
    context.strokeStyle="green";
    context.lineWidth=4;
    context.arc(e.clientX, e.clientY, 2, 0, Math.PI*2);
    context.fillStyle = "white";
    context.fill();
    canvas.style.cursor="pointer";
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
  }
}

const down = (e) => {
  dragging = true;
  draw(e);
}

const toggledraw = () => {
  dragging = false;
  context.beginPath();
  context.font = "10px serif";
  if (matrixOn) {
    matrixmode();
  }
  // console.log(array);
}

const matrixmode = () => {
  for (var x = 0; x <= canvas.width / 10; x ++) {
    var row = array[x];
    for (var y = 0; y <= canvas.height / 10 ; y ++) {
      if (array[x][y] === 1) {
          context.fillStyle = "white";
          context.textAlign = "center";
          context.fillText("1",x * 10 - 10 ,y * 10 - 10);
      }else {
        context.fillStyle = "green";
        context.textAlign = "center";
        context.fillText("0",x * 10 - 10 ,y * 10 - 10);
      }
    }
  }
  matrixOn = true;
  console.log(output.value);
}

const saveData = () => {
  var op = {[output.value]: 1}
  trainData.push({input: array, output: op});
  array = createArray();
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  console.log(trainData);
}

const trainNet = () => {
  net.train(trainData);
}

const testNet = () => {
  var output = net.run(array);
  console.log(output);
}


canvas.addEventListener('mousedown', down)
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', toggledraw);
matrix.addEventListener('click', matrixmode);
save.addEventListener('click', saveData);
train.addEventListener('click', trainNet);
test.addEventListener('click', testNet);
