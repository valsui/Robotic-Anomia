import React from 'react';
import { connect } from 'react-redux';
import Outputs from './outputs';
import * as d3 from "d3";
import { resetOutputData } from '../../actions/test_data_actions';

class OutputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.createOutputD3();
    }

    componentDidUpdate() {
        this.createOutputD3();
    }

    shuffleData(data) {
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

    createOutputD3() {
        const node = this.node;
        const words = this.getPercentages();
        const percentages = this.parsePercentages(words);

        if ( percentages === null ) {
            return;
        }

        const radiusScale = d3.scaleSqrt().domain([0, percentages[0].percent]).range([20,70]);

        const shuffledPercentages = this.shuffleData(percentages);

        d3.selectAll("svg > *").remove();

        const svg = d3.selectAll("svg")
            .append("g")

        const circle = svg.selectAll("circle")
            .data(shuffledPercentages)


        const g = circle.enter().append("g")
            g.append("circle")
            .attr('r', (d) => radiusScale(d.percent))
            .attr('class', 'node')
            .style('fill', 'white')
            .style('stroke-width', '5px')
            .style('stroke', "blue")

        g.append("text")
            .text((d) => d.string)
            .attr('y', (d) => d.y)
            .attr('x', (d) => d.x)



        g.on('click', (d) => this.handleClick(d))

        const width = 800;
        const height = 800;
        const simulation = d3.forceSimulation()
            .force("x", d3.forceX(width/2).strength(.005))
            .force("y", d3.forceY(height/2).strength(.01))
            .force("center", d3.forceCenter().x(width * .5).y(height * .5))
            .force("charge", d3.forceManyBody().strength(-15))
            .force("collide", d3.forceCollide((d) => radiusScale(d.percent)+ 5).strength(.5))


        simulation
            .nodes(shuffledPercentages)
            .on("tick", () => {
                g
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

            });


    }

    addLettersToTraining(d){
        const { arrayShapes} = this.props;
        const letters = d.string.split("");

        let trainingData = [];

        arrayShapes.forEach((array, i) => {
            let obj = {};
            obj["input"] = array;
            obj["output"] = {
                [letters[i]]: 1
            }

            trainingData.push(obj);
        })

        return trainingData;
        // console.log("trainingData", this.trainingData);
    }

    handleClick(d) {
        const { net, dumbNet, currentNetwork, resetOutputData } = this.props;

        let trainingData = this.addLettersToTraining(d);

        if ( currentNetwork === "trainedNet" ) {
            net.trainAsync(trainingData).then(() => {
                resetOutputData();
                console.log("done training!");
                d3.selectAll("svg > *").remove();
            });
        } else {
            dumbNet.trainAsync(trainingData).then(() => {
                resetOutputData();
                console.log("done training dumbnet!");
                d3.selectAll("svg > *").remove();
            })
        }
    }


    getPercentages() {
        const { outputs } = this.props;
        // console.log(outputs);

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
                    width={800} height={800}>
                </svg>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    outputs: state.entities.outputs,
    arrayShapes: state.entities.arrayShapes,
    net: state.entities.neuralNetworks.trainedNet,
    dumbNet: state.entities.neuralNetworks.dumbNet,
    currentNetwork: state.ui.currentNetwork
})

const mapDispatchToProps = dispatch => ({
    resetOutputData: () => dispatch(resetOutputData())
})

export default (connect(mapStateToProps, mapDispatchToProps)(OutputContainer));
