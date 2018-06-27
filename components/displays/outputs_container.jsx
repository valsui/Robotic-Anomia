import React from 'react';
import { connect } from 'react-redux';
import Outputs from './outputs';
import OutputItem from './output_item';

class OutputContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    getPercentages() {
        const { outputs } = this.props;
        console.log(outputs);

        let outputArray = outputs.map (( output ) => { 
            let subArray = [];

            for ( let key in output ) {
                subArray.push([key, output[key]])
            }

            subArray = subArray.sort( (arr1, arr2) => arr2[1] - arr1[1] );

            return subArray.slice(0,3);
        }) 

        // outputArray = [["a", .99], ["b", .98]]
       return outputArray;
    }

    parsePercentages(words) {
        let percents = {}

        if ( words.length === 0 ) {
            return null;
        }

        let allWords = this.recursiveParse(words);

        allWords = allWords.sort( (arr1, arr2) => arr2[1] - arr1[1] );

        allWords = allWords.slice(0,11);

        allWords.forEach((word) => {
            percents[word[0].join("")] = word[1]
        })

        return percents;
    }

    recursiveParse(words) {
        if  ( words.length <= 1 ) {
            let arr = [];
            words[0].forEach ((letter) => {
                arr.push([[letter[0]], letter[1]]);
            })

            return arr;
        };

        let prevWords = this.recursiveParse(words.slice(1));
        let newWords = []
        words[0].forEach ((letter) => {
            prevWords.forEach ((innerWord) => {
                newWords.push([[letter[0]].concat(innerWord[0]), letter[1] + innerWord[1]]);
            })
        })

        return newWords;
    }

    render() {
        const words = this.getPercentages();
        const percentages = this.parsePercentages(words);

        return (
            <div className="output-wrapper">
               <Outputs output={percentages} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    outputs: state.entities.outputs
})

export default (connect(mapStateToProps, null)(OutputContainer))