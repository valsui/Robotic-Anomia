import React from 'react';
import { connect } from 'react-redux';
import Outputs from './outputs';

class OutputContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    //gets the top n key value pairs of an output object and returns and array or sorted kvps
    getTopKeysPerOutput(output, n) {
        let topN = [];
        //push all kvps to array
        for( let letter in output){
            topN.push([letter, output[letter]])
        }

        // sort by descending percentages
        topN.sort((a,b) => b[1]-a[1]); 
        //return top n kvps in an array
        return topN.slice(0, n+1); 
    }

    // gets the top N keys for each letter that is detected and stores them in an object in sequential order
    getTopsKey(n){
        let topkeys = {};
        this.props.outputs.forEach((output, i) => {
            const topN = this.getTopKeysPerOutput(output, n);
            topkeys[i] = topN;
        })
        return topkeys;
    }

    sumNums(...args){
        let sum = 0;
        args.forEach(e => {
            sum += e;
        })
        return sum;
    }

    getNthBiggest(array, n){
        array.sort((a,b) => b-a);
        return array[n-1];
    }

    comboTwoArrays(arr1, arr2){
        let result = [];
    }

    createCombinations(n){
        let combos = {};
        let topNKeysPerLetter = this.getTopsKey(n);
        let writtenLetters = Object.keys(topNKeysPerLetter); // 1, 2, 3, ... number of observations 

        

    }
    

    render() {
        return (
            <div className="output-wrapper">
                { this.props.outputs.map((output, i) => {
                    return <Outputs key={i} output={output} />
                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    outputs: state.entities.outputs
})

export default (connect(mapStateToProps, null)(OutputContainer))