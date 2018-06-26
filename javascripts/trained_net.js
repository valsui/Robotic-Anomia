import brain from 'brain.js';
import { testData } from '../test_suite/brain_train';
import { slicedTestData} from '../test_suite/sliced_brain_train';
import { valTestData } from '../test_suite/valerie_brain_train';
import { a } from '../training_data/data_a';
import { b } from '../training_data/data_b';
import { c } from '../training_data/data_c';
import { d } from '../training_data/data_d';
import { e } from '../training_data/data_e';
import { f } from '../training_data/data_f';
import { g } from '../training_data/data_g';
import { h } from '../training_data/data_h';
import { i } from '../training_data/data_i';
import { j } from '../training_data/data_j';
import { k } from '../training_data/data_k';
import { l } from '../training_data/data_l';
import { m } from '../training_data/data_m';
import { n } from '../training_data/data_n';
import { o } from '../training_data/data_o';
import { p } from '../training_data/data_p';
import { q } from '../training_data/data_q';
import { r } from '../training_data/data_r';
import { s } from '../training_data/data_s';
import { t } from '../training_data/data_t';
import { u } from '../training_data/data_u';
import { v } from '../training_data/data_v';
import { w } from '../training_data/data_w';
import { x } from '../training_data/data_x';
import { y } from '../training_data/data_y';
import { z } from '../training_data/data_z';
// This is our trained neural network.  It will be trained using the information stored on test data, which is what we need to train the neural network every time the page loads.

let config = {
    iterations: 10000,
    learningRate: 0.3,
    layers: [4]
}

const net = new brain.NeuralNetwork(config);

//data set containing around 1200 data points
let data = a.concat(b).concat(d).concat(c).concat(e).concat(f).concat(g).concat(h).concat(i).concat(j).concat(k).concat(l).concat(m).concat(n).concat(o).concat(p).concat(q).concat(r).concat(s).concat(t).concat(u).concat(v).concat(w).concat(x).concat(y).concat(z);

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

    console.log(iterator);
    console.log(revertToBox(data[iterator]));
    console.log(revertToBox({input: net.weights[2][0]}));
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
data = shuffleData(data);
// console.log(data);
// let data = a;
//
// train(net, data, 0);

net.trainAsync(testData).then(() => console.log("done!"));
// net.trainAsync(data).then(() => console.log("done training!"));

export default net;
