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

const IMAGE_SIZE = 625;
const NUM_CLASSES = 10;
const NUM_DATASET_ELEMENTS = data.length;

const TRAIN_TEST_RATIO = 4 / 5;
const NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

class LetterData {
    constructor() {
        this.shuffledTrainIndex = 0;
        this.shuffledTestIndex = 0;
    }

}