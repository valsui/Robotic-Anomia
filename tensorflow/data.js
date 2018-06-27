import * as tf from '@tensorflow/tfjs';

//importing all the data 
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

//data set containing around 1200 data points
let data = a.concat(b).concat(d).concat(c).concat(e).concat(f).concat(g).concat(h).concat(i).concat(j).concat(k).concat(l).concat(m).concat(n).concat(o).concat(p).concat(q).concat(r).concat(s).concat(t).concat(u).concat(v).concat(w).concat(x).concat(y).concat(z);

let dataA = a;
export const aInput = () => {
    let result = [];
    dataA.forEach((dataPair) => {
        result.push(dataPair.input)
    });
    return result;
}

export const aOutput = () => {
    let result = [];
    aOutput.forEach((dataPair) => {
        let out = dataPair.output;
        let letter = Object.keys(out)[0]
        // result.push(ALPHABET.indexOf(letter));
        result.push(letter);
    })
    return result;
}

export const aHotOnes = () => {
    return aOutput().map((letter) => {
        return [
            letter === 'a' ? 1 : 0
        ]
    })
}

// function to shuffle dataset
const shuffleData = (data) => {
    let currentIdx = data.length;
    let tempVal, randomIdx;
    
    while (0 !== currentIdx) {
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

//shuffle dataset to input into training model
data = shuffleData(data);
// console.log(data);

export const inputData = () => {
   let result = [];
    data.forEach((dataPair) => {
        result.push(dataPair.input)
    });
    return result;
}   

export const inputTFData625 = tf.tensor2d(inputData(), [inputData().length, 625]);

export const inputTFData25Matrix = inputData().map((arr) => {
    let j = 0;
    let result = [];
    while (j < 625) {
        result.push(arr.slice(j, j + 25))
        j += 25;
    }
    return result;
})

console.log('mtx:',inputTFData25Matrix);
// console.log('input')
// inputTFData.print();
// console.log('input',inputTFData.print());
// const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const outputData = () => {
    let result = [];
    data.forEach((dataPair) => {
        let out = dataPair.output;
        let letter = Object.keys(out)[0]
        // result.push(ALPHABET.indexOf(letter));
        result.push(letter);
    })
    return result;
}

export const hotOnes = outputData().map((letter) => {
    return [
        letter === 'a' ? 1 : 0,
        letter === 'b' ? 1 : 0,
        letter === 'c' ? 1 : 0,
        letter === 'd' ? 1 : 0,
        letter === 'e' ? 1 : 0,
        letter === 'f' ? 1 : 0,
        letter === 'g' ? 1 : 0,
        letter === 'h' ? 1 : 0,
        letter === 'i' ? 1 : 0,
        letter === 'j' ? 1 : 0,
        letter === 'k' ? 1 : 0,
        letter === 'l' ? 1 : 0,
        letter === 'm' ? 1 : 0,
        letter === 'n' ? 1 : 0,
        letter === 'o' ? 1 : 0,
        letter === 'p' ? 1 : 0,
        letter === 'q' ? 1 : 0,
        letter === 'r' ? 1 : 0,
        letter === 's' ? 1 : 0,
        letter === 't' ? 1 : 0,
        letter === 'u' ? 1 : 0,
        letter === 'v' ? 1 : 0,
        letter === 'w' ? 1 : 0,
        letter === 'x' ? 1 : 0,
        letter === 'y' ? 1 : 0,
        letter === 'z' ? 1 : 0
    ]
});

export const outputTFData = tf.tensor2d( hotOnes, [hotOnes.length, 26]);
// // console.log('out')
// outputTFData.print()
// const IMAGE_SIZE = 625;
// const NUM_CLASSES = 26;
// const NUM_DATASET_ELEMENTS = data.length;

// const TRAIN_TEST_RATIO = 4 / 5;
// const NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);
// const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

// class LetterData {
//     constructor() {
//         this.shuffledTrainIndex = 0;
//         this.shuffledTestIndex = 0;
//     }
    
    

//     // getTrainIndices(){
//     //     this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
//     // }

//     // getTestIndices(){
//     //     tf.util.createShuffledIndices(NUM_TEST_ELEMENTS)
//     // };


// }