import React from 'react';
import { connect } from 'react-redux';
import TopOutput from './top_output';
import * as d3 from "d3";
import { shuffleData } from '../../javascripts/data_util';
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

    componentWillUnmount() {
        this.props.resetOutputData();
        d3.selectAll("svg").remove();
    }

    createOutputD3() {
        //node data
        const words = this.getPercentages();
        let data = this.parsePercentages(words);

        if ( data === null ) {
            return;
        }

          // data = data.slice(0,9);

        const dataLength = data.length;

        // //link data
        const links = this.addLinks(dataLength);

        // let dataPoints = data.top;
        let graphSelection = d3.select(".chart")
        let width = 850;
        let height = 600;


        d3.selectAll("svg").remove();

        // selects the "graph" div on the html page and appends a svg container
        let svgContainer = graphSelection
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)");

        //radius scale
        let radiusScale = d3.scaleSqrt().domain([0, data[0].percent]).range([20,65]);
        // formats numbers by rounding down. ex 6.2 => 6
        let format = d3.format(",d");
        //shuffle data
        const shuffledData = shuffleData(data);

        // the simulation is a collection of forces
        // about where we want our circles to go
        // and how we want our circles to interact

        let forceXCombine = d3.forceX(width / 2).strength(0.14);

        let forceY = d3.forceY(function (d) {
            return (height + 10) / 2;
        }).strength(0.1);

        let forceCollide = d3.forceCollide(function (d) {
            return radiusScale(d.percent) + 10;
        })

        let simulation = d3.forceSimulation()
            .force("x", forceXCombine)
            .force("y", forceY)
            .force("collide", forceCollide)
            .force('charge', d3.forceManyBody().strength(10))

        // //draw lines for nodelinks
        const nodeLinks = svgContainer.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            // .style("stroke", "lightgrey")

        //draw circles
        let circles = svgContainer.selectAll(".node")
            .data(shuffledData)
            .enter().append("circle")
            .attr("class", "output")
            .attr("r", function (d) {
                return radiusScale(d.percent);
            })
            .attr("fill", function (d) {
                return 'rgba(255,255,255,0.5)';
            })

            .on('click', (d) => {
                    return this.handleClick(d);
                }
            )
            .on("mouseenter", function (d) {
                let mouseNode = d3.select(this)
                    console.log('mouseover', mouseNode);
                    mouseNode.style('fill', 'rgba(255,255,255,0.9)')
                // mouseNode.style('opacity', 1)
                    mouseNode.transition().duration(100).delay(50).attr('r', 72);
                    mouseNode.attr('id','hover-node')
                    // mouseNode.select('text')
            })

            .on('mouseleave', function (d) {
              let mouseNode = d3.select(this)
                  mouseNode.transition().duration(200).delay(0).attr('r', function (d) {
                      return radiusScale(d.percent);
                  }).style('fill', 'rgba(255,255,255,0.5)');
            });


        let texts = svgContainer.selectAll(null)
            .data(shuffledData)
            .enter()
            .append("g")
            .attr("class", "output-text")

        texts.append("text")
            .attr("text-anchor", "middle")
            .text((d) => {
                return d.string
            })
            .style("fill","rgb(11,93,228)")

        simulation
            .nodes(shuffledData)
            .force('link', d3.forceLink().links(links))
            .on('tick', ticked);


        function ticked() {

            //redraw link while it moves
            nodeLinks
                .attr('x1', function (d) {
                    return d.source.x
                })
                .attr('y1', function (d) {
                    return d.source.y
                })
                .attr('x2', function (d) {
                    return d.target.x
                })
                .attr('y2', function (d) {
                    return d.target.y
                })

            circles
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                })

            texts.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")"
            })
        }

    }

    addLinks(length){
        const links = [];
        for( let i = 0; i < length - 1; i++){
            for( let j = i + 1; j < length; j++){
                let temp = {};
                temp['source'] = i;
                temp['target'] = j;
                links.push(temp);
            }
        }
        return links;
    }

    addLettersToTraining(d){
        const { arrayShapes } = this.props;
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

        const trainingData = this.addLettersToTraining(d);
        const shuffledData = shuffleData(trainingData);


        if ( currentNetwork === "trainedNet" ) {
            net.trainAsync(shuffledData).then(() => {
                resetOutputData();
                console.log("done training!");
                d3.selectAll("svg > *").remove();
            });
        } else {
            dumbNet.trainAsync(shuffledData).then(() => {
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

        return (
            <div className="output-container">
                { percentages === undefined || percentages === null ? (
                    null
                ) : (
                    <TopOutput top={percentages[0]} handleClick={this.handleClick.bind(this)} />
                )}
                <div className = 'chart'></div>
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
