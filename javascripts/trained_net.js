import brain from 'brain.js';
import { testData } from '../test_suite/brain_train';

const net = new brain.NeuralNetwork();

net.train(testData);

export default net;