import brain from 'brain.js';
import { testData } from '../test_suite/brain_train';
import { slicedTestData} from '../test_suite/sliced_brain_train';
// This is our trained neural network.  It will be trained using the information stored on test data, which is what we need to train the neural network every time the page loads.

let config = {
    iterations: 10000,
    learningRate: 0.3,
    layers: [3]
}

const net = new brain.NeuralNetwork(config);

net.trainAsync(testData).then(console.log("done!"));
net.trainAsync(slicedTestData).then(console.log("done training!"));

export default net;
