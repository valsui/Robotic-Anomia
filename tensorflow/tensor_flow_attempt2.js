import * as tf from '@tensorflow/tfjs';
import { inputTFData, outputTFData, inputData } from './data';

const model = tf.sequential();

console.log('inputdata',inputData());

model.add(tf.layers.dense({
    units: 300,
    inputShape: [625],
    activation: 'relu'
}))

model.add(tf.layers.dense({
    units: 300,
    activation: 'relu'
}))

model.add(tf.layers.dense({
    // inputShape: [300],
    units: 26,
    activation: 'relu'
}))

model.compile({
     optimizer: 'sgd', 
     loss: 'meanSquaredError',
    metrics: ['accuracy'] 
});

let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0.3333333333333333, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0.3333333333333333, 0, 0, 0, 0, 0, 0.5555555555555556, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 0.3333333333333333, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 0.8888888888888888, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3333333333333333, 0.5555555555555556, 0.1111111111111111, 0, 0, 0, 0.5555555555555556, 1, 1, 0.8888888888888888, 0.4444444444444444, 0.8888888888888888, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 0, 0, 0, 0.5555555555555556, 0.8888888888888888, 1, 0.6666666666666666, 0.2222222222222222, 0, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 0.5555555555555556, 0, 0.6666666666666666, 1, 1, 0.5555555555555556, 0.1111111111111111, 0, 0, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 1, 0.7777777777777778, 0, 1, 1, 0.6666666666666666, 0.1111111111111111, 0, 0, 0, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0.8888888888888888, 0.5555555555555556, 0.1111111111111111, 0, 0, 0, 0, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 1, 1, 0.5555555555555556, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3333333333333333, 0.8888888888888888, 0.8888888888888888, 0.5555555555555556, 0.1111111111111111, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2222222222222222, 0.2222222222222222, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//test a
let test = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 0.6666666666666666, 0.6666666666666666, 0.6666666666666666, 0.5555555555555556, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7777777777777778, 1, 1, 1, 1, 1, 0.8888888888888888, 0.5555555555555556, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 1, 1, 0.7777777777777778, 0.6666666666666666, 0.6666666666666666, 0.6666666666666666, 0.8888888888888888, 1, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 1, 1, 0.7777777777777778, 0.4444444444444444, 0.1111111111111111, 0, 0, 0, 0.2222222222222222, 0.6666666666666666, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 0.6666666666666666, 0.1111111111111111, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.8888888888888888, 0.2222222222222222, 0, 0, 0, 0, 0, 0, 0, 0, 0.7777777777777778, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.7777777777777778, 0, 0, 0, 0, 0, 0, 0, 0.7777777777777778, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0.4444444444444444, 0, 0, 0.6666666666666666, 0.8888888888888888, 1, 1, 1, 1, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0.8888888888888888, 1, 1, 1, 1, 1, 0.8888888888888888, 0.6666666666666666, 0.4444444444444444, 0.1111111111111111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 1, 1, 1, 1, 1, 1, 0.7777777777777778, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 1, 1, 1, 1, 1, 1, 1, 0.8888888888888888, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3333333333333333, 0.5555555555555556, 0.3333333333333333, 0.3333333333333333, 0.3333333333333333, 0.5555555555555556, 0.6666666666666666, 0.7777777777777778, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3333333333333333, 0.4444444444444444, 0.6666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//test z
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7777777777777778, 0.8888888888888888, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 0.3333333333333333, 0, 0, 0, 0, 0, 0, 0, 0.7777777777777778, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 0.5555555555555556, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2222222222222222, 0.1111111111111111, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7777777777777778, 1, 1, 0.6666666666666666, 0.7777777777777778, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 1, 0.6666666666666666, 0.1111111111111111, 0.6666666666666666, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 1, 1, 0.6666666666666666, 0.1111111111111111, 0, 0.4444444444444444, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 1, 0.8888888888888888, 0.5555555555555556, 0.1111111111111111, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 0.7777777777777778, 1, 1, 0.8888888888888888, 0.3333333333333333, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0.7777777777777778, 0.2222222222222222, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0.7777777777777778, 0.3333333333333333, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8888888888888888, 0.6666666666666666, 0.1111111111111111, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2222222222222222, 0.1111111111111111, 0, 0, 0, 0, 0, 0, 0, 0, 0.6666666666666666, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5555555555555556, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// let datum = [];
// let i = 0;
// while (datum.length < 25) {
//     datum.push(array.slice(i, i + 25));

//     i += 25;
// }
let datumTF = tf.tensor2d(array, [1, 625]);
let testTF = tf.tensor2d(test, [1,625])
let labelTF = tf.tensor2d([1],[1,1])


model.fit(
    inputTFData, outputTFData, { epoch: 4 }
).then((history) => {
    console.log(history);
    model.predict(testTF).print()
})
// console.log(history);

export default model;