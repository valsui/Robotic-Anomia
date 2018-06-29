import React from 'react';
import { connect } from 'react-redux';
import Outputs from './outputs';
import * as d3 from "d3";
import { shuffleData } from '../../tensorflow/data';
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

    createOutputD3() {
        // const node = this.node;
        //node data
        const words = this.getPercentages();
        const percentages = this.parsePercentages(words);
        
        if ( percentages === null ) {
            return;
        }
        const percentageLength = percentages.length;

        //link data
        const links = this.addLinks(percentageLength);

        //radius scale - max out at 80
        const radiusScale = d3.scaleSqrt().domain([0, percentages[0].percent]).range([20,80]);
        // color gradient scale based on radius 
        const linearColorScale = d3.scaleLinear()
            .domain([0, percentages[0].percent])
            .range(['#c0c0aa', '#1cefff']);
        //shuffle percentages so that largest isn't always in teh middle
        const shuffledPercentages = shuffleData(percentages);
        //remove all the elements inside the svg before creating 
        d3.selectAll("svg > *").remove();

        //add mouseover event on circle to expand radius on hover
        const handleMouseOver = (d) => {  // Add interactivity
        // console.log(this)
            // Use D3 to select element, change color and size
            console.log(d3.select(`#${d.string}`));
            d3.select(`#${d.string}`).attr({
                fill: "orange",
                r: (d) => radiusScale(d.percent) * 2
            });
        }
        // add mouseout event to return to normal
        const handleMouseOut = (d) => {
            // Use D3 to select element, change color back to normal
            d3.select(`#${d.string}`).attr({
                fill: (d) => linearColorScale(d.percent),
                r: (d) => radiusScale(d.percent)
            });
        }

        //append group tag to svg
        const svg = d3.selectAll("svg")
            .append("g")
        //bind data to the group
        const circle = svg.selectAll("circle")
            .data(shuffledPercentages)  
        //create circle for each output in percentages - put each circle in it's own group to bind text to it 
        const g = circle.enter().append("g")
            g.append("circle")
            .attr('class', 'node')
            .attr('id', (d) => `#${d.string}`)
            .attr('r', (d) => radiusScale(d.percent))
            .style('fill', (d) => linearColorScale(d.percent))
            .style('stroke-width', '5px')
            .style('stroke', "blue")
            // .on('mouseover', handleMouseOver)
            // .on('mouseout', handleMouseOut)

        //add text along with the circle
        g.append("text")
            .text((d) => d.string)
            .attr('y', (d) => d.y)
            .attr('x', (d) => d.x)
        //click handler to add to training data
        g.on('click', (d) => this.handleClick(d))

        //draw lines for nodelinks
        const nodeLinks = svg.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .style("stroke", "lightgrey")
            .style('stroke-opacity', 0.4)

        const width = 800;
        const height = 800;
        // define force simulation
        const simulation = d3.forceSimulation()
            .force("x", d3.forceX(width/2).strength(.005))
            .force("y", d3.forceY(height/2).strength(.01))
            .force("center", d3.forceCenter().x(width * .5).y(height * .5))
            .force("charge", d3.forceManyBody().strength(-15))
            .force("collide", d3.forceCollide((d) => radiusScale(d.percent)+ 5).strength(.5))
    
        //bind nodes and links to simulation 
        simulation
            .nodes(shuffledPercentages)
            .force('link', d3.forceLink().links(links).distance(100))
            .on("tick", () => {
                //translate the axis of the group (text an circle) while it moves
                g.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
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
            });

         
    }

    addLinks(length){
        // const length = percentages.length;
        const links = [];
        for( let i = 0; i < length - 1; i++){
            for( let j = i + 1; j < length; j++){
                let temp = {};
                temp['source'] = i;
                temp['target'] = j; 
                links.push(temp);
            }
        }
        // links.push({'source': 0, 'target': links.length - 1});
        // console.log(links);
        return links;
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
            <div className = 'svgContainer'>
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