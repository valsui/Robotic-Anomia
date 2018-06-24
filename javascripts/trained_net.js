import brain from 'brain.js';
import { testData } from '../test_suite/brain_train';

// This is our trained neural network.  It will be trained using the information stored on test data, which is what we need to train the neural network every time the page loads.

let config = {
    iterations: 10000,
    learningRate: 0.3,
    layers: [5]
}

const net = new brain.NeuralNetwork(config);

net.train(testData);

export default net;