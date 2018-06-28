import React from 'react';
import { connect } from 'react-redux';
import Outputs from './outputs';
import * as d3 from "d3";

class OutputContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.createOutputD3();
    }

    componentDidUpdate() {
        this.createOutputD3();
    }

    createOutputD3() {
        const node = this.node;
        const words = this.getPercentages();
        const percentages = this.parsePercentages(words);

        if ( percentages === null ) {
            return;
        }

        d3.selectAll("svg > *").remove();

        // const svg = d3.selectAll("svg")
        //     .append('g')
        //         .attr('transform', 'translate(30,30)')
        
        // const circle = svg.selectAll("circle")
        //     .data(percentages)
        // const g = circle.enter().append("g")
        //     g.append("circle")
        //     .attr('r', 40)
        //     .attr('cy', Math.random() * 200)
        //     .attr('cx', (d) => d.percent * 800 )
        //     .text((d) => d[0])
        //     .attr('class', 'node')
        //     .style('fill', 'white')
        //     .style('stroke-width', '5px')
        //     .style('stroke', "blue")

        // const texts = g.selectAll("text")
        //     .data(percentages)
        //     .enter().append('text')
        //     .style("fill", "black")
        //     .text((d) => d.string)
        //     .attr("x", (d) => d.x)
        //     .attr("y", (d) => d.y)

         
    }

    getPercentages() {
        const { outputs } = this.props;
        console.log(outputs);

        let outputArray = outputs.map (( output ) => { 
            let subArray = [];

            // adds all the key value pairs as nested arrays
            for ( let key in output ) {
                subArray.push([key, output[key]])
            }

            subArray = subArray.sort( (arr1, arr2) => arr2[1] - arr1[1] );

            // returns only the top three values for each canvas character
            return subArray.slice(0,3);
        }) 

        // outputArray = [["a", .99], ["b", .98]]
       return outputArray;
    }

    parsePercentages(words) {
        // let percents = {}
        let percentsArray = [];

        if ( words.length === 0 ) {
            return null;
        }

        // the result from the recursive parse is added to a variable, allWords, which is then sorted by the highest percentage word.
        // each word is then added as a key into an object and the combined percentages of the letters is added as the value.
        let allWords = this.recursiveParse(words);

        allWords = allWords.sort( (arr1, arr2) => arr2[1] - arr1[1] );

        allWords = allWords.slice(0,11);

        // allWords.forEach((word) => {
        //     percents[word[0].join("")] = word[1]
        // })

        allWords.forEach((word) => {
            percentsArray.push({
                string: word[0].join(""),
                percent: word[1]
            })
        })

        return percentsArray;

        // return percents;
    }

    // recursive parse adds all the string combinations together along with their weight percentage and returns them in an array.
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

        // return (
        //     <div className="output-wrapper">
        //        <Outputs output={percentages} />
        //     </div>
        // )

        return (
            <div>
                <svg id="svg" ref={node => this.node = node}
                    width={800} height={500}>
                </svg>
                <Outputs output={percentages} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    outputs: state.entities.outputs
})

export default (connect(mapStateToProps, null)(OutputContainer));