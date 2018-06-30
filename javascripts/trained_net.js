import brain from 'brain.js';
import { machine } from '../public/machine.js';

// This is our trained neural network.  It will be trained using the information stored on test data, which is what we need to train the neural network every time the page loads.

let config = {
    iterations: 10000,
    learningRate: 0.3,
    hiddenLayers: [312, 312]
}

const net = new brain.NeuralNetwork(config);
//data set containing around 1200 data points
// function to shuffle dataset
const shuffleData = (data) => {
    let currentIdx = data.length;
    let tempVal, randomIdx;
    while( 0!== currentIdx) {
        //Pick random idx
        randomIdx = Math.floor(Math.random() * currentIdx);
        currentIdx -= 1;
        //swap with current element
        tempVal = data[currentIdx];
        data[currentIdx] = data[randomIdx];
        data[randomIdx] = tempVal;
    }
    return data
}

const train = (net, data, iterator) => {
  if(iterator === data.length){
    // Done training data
  }else {
    asyncFunc(net, data, iterator)
  }
}

const asyncFunc = (net, data, iterator) => {
  net.trainAsync(data[iterator]).then( () => {

    // console.log(revertToBox(net.weights[2][0]));
    // train(net, data, iterator + 1);
  });
}



const revertToBox = (dataObject) => {
  let box = []
  let row = [];
  for(let i = 0; i < dataObject.input.length; i++){
    if(row.length === 25){
      box.push(row);
      row = [];
    }
    row.push(dataObject.input[i])
  }
  box.push(row);
  return box;
}
//shuffle dataset to input into training model

// let rawFile = new XMLHttpRequest();

rawFile.open("GET",  "https://raw.githubusercontent.com/valsui/Robotic-Anomia/master/public/machine.txt", true);
rawFile.onreadystatechange = () => {
  if(rawFile.readyState === 4){
    if(rawFile.status === 200 || rawFile.status == 0){
        net.fromJSON(JSON.parse(rawFile.responseText));
      }
    }
  }
rawFile.send(null);

export default net;
