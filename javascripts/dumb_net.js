import { NeuralNetwork } from "brain.js";
import { createMachine } from './api_utils';

const config = {
    iterations: 10000,
    learningRate: 0.3,
    hiddenLayers: [312, 312],
}

const dumbNet = new NeuralNetwork(config);

let rawFile = new XMLHttpRequest();

rawFile.open("GET",  "http://localhost:8000/dumbNet.txt", true);
rawFile.onreadystatechange = () => {
  if(rawFile.readyState === 4){
    if(rawFile.status === 200 || rawFile.status == 0){
        dumbNet.fromJSON(JSON.parse(rawFile.responseText));
      }
    }
  }
rawFile.send(null);

export default dumbNet;
