import { NeuralNetwork } from "brain.js";
import { createMachine } from './api_utils';

const config = {
    iterations: 10000,
    learningRate: 0.1,
    hiddenLayers: [312, 312, 312],
}

const dumbNet = new NeuralNetwork(config);

let rawFile = new XMLHttpRequest();

rawFile.open("GET",  "https://raw.githubusercontent.com/valsui/Robotic-Anomia/Dan/public/dumbNet.txt", true);
rawFile.onreadystatechange = () => {
  if(rawFile.readyState === 4){
    if(rawFile.status === 200 || rawFile.status == 0){
        dumbNet.fromJSON(JSON.parse(rawFile.responseText));
      }
    }
  }
rawFile.send(null);

export default dumbNet;
