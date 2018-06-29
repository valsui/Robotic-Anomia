import * as tf from '@tensorflow/tfjs';
import { inputData, outputData, hotOnes, aInput, aHotOnes } from './data';

const IMAGE_SIZE = 625;
const NUM_CLASSES = 1;
const NUM_DATASET_ELEMENTS = aInput.length;

const NUM_TRAIN_ELEMENTS = 10;
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

export class MnistData {
    constructor(){
        this.shuffledTrainIndex = 0;
        this.shuffledTestIndex = 0;
    }

    async load() {
        // initializes an array that can hold # elements * image_pixels integers 
        const datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);
        this.datasetImages = new Float32Array(datasetBytesBuffer);
        let data = aInput //inputData();
        let outData = aHotOnes //hotOnes;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 25; 
        canvas.height = 25; 
            for(let i = 0; i < NUM_DATASET_ELEMENTS; i++){
                let j = 0;
                ctx.clearRect(0, 0, 25, 25);
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, 25, 25);
                let drawArray = [];
                while (j < 625) {
                    let currentData = data[i];
                    drawArray.push(currentData.slice(j, j + 25))
                    j += 25;
                }
                for (let i = 0; i < drawArray.length; i++) {
                    for (let j = 0; j < drawArray[0].length; j++) {
                        if (drawArray[i][j] === 1) {
                            ctx.beginPath();
                            ctx.fillStyle = "black";
                            ctx.fillRect(i, j, 1, 1);
                        } else if (drawArray[i][j] > .5 && drawArray[i][j] < 1) {
                            ctx.beginPath();
                            ctx.fillStyle = "black";
                            ctx.fillRect(i,j, 1, 1);
                        } else if (drawArray[i][j] > 0) {
                            ctx.beginPath();
                            ctx.fillStyle = "yellow";
                            ctx.fillRect(i,j, 1, 1);
                        }
                    }
                }
                let datasetBytesView = new Float32Array(datasetBytesBuffer, 625 * i * 4, 625);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for(let k = 0; k < imageData.data.length / 4; k++){
                    datasetBytesView[k] = imageData.data[k * 4] / 255;
                }
        
            }
        let array = [];
        for(let i = 0; i < NUM_DATASET_ELEMENTS; i++){
            for(let j = 0; j < NUM_CLASSES; j++){ 
                // array.push(hotOnes[i][j]);
                array.push(aHotOnes[i][j])
            }
        }
        this.datasetLabels = new Uint8Array(array);

        this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
        this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS);
        console.log(this.trainIndices);
        console.log(this.testIndices);
        this.trainImages = this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
        this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
        this.trainLabels = this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
        this.testLabels = this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);
    }

    nextTrainBatch(batchSize){
        return this.nextBatch(
            batchSize, [this.trainImages, this.trainLabels], () => {
                this.shuffledTrainIndex = (this.shuffledTrainIndex + 1) % this.trainIndices.length;
                return this.trainIndices[this.shuffledTestIndex];
            });
    }

    nextTestBatch(batchSize){
        return this.nextBatch(batchSize, [this.testImages, this.testLabels], () => {
            this.shuffledTestIndex = (this.shuffledTestIndex + 1) % this.testIndices.length;
            return this.testIndices[this.shuffledTestIndex];
        })
    }
    nextBatch(batchSize, data, index){
        const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
        const batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);
        for(let i = 0; i < batchSize; i++){
            const idx = index();
            const image = data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
            batchImagesArray.set(image, i * IMAGE_SIZE);
            const label = data[1].slice(idx * NUM_CLASSES, idx * NUM_CLASSES + NUM_CLASSES);
            batchLabelsArray.set(label, i * NUM_CLASSES);
        }
        const xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
        const labels = tf.tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]);

        return {xs, labels};
    }
}