import React from 'react';
import { connect } from 'react-redux';
import TopOutput from './top_output';
import * as d3 from "d3";
import { shuffleData } from '../../javascripts/d3_util';
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
        //node data
        const words = this.getPercentages();
        const data = this.parsePercentages(words);
        
        if ( data === null ) {
            return;
        }
        const dataLength = data.length;

        // //link data
        const links = this.addLinks(dataLength);

        // //radius scale - max out at 80
        // const radiusScale = d3.scaleSqrt().domain([0, percentages[0].percent]).range([20,80]);
        // // color gradient scale based on radius 
        // const linearColorScale = d3.scaleLinear()
        //     .domain([0, percentages[0].percent])
        //     .range(['#c0c0aa', '#1cefff']);
        // //shuffle percentages so that largest isn't always in teh middle
        // const shuffledPercentages = shuffleData(percentages);
        // //remove all the elements inside the svg before creating 
        // d3.selectAll("svg > *").remove();

        // //add mouseover event on circle to expand radius on hover
        // const handleMouseOver = (d) => {  // Add interactivity
        // // console.log(this)
        //     // Use D3 to select element, change color and size
        //     console.log(d3.select(`#${d.string}`));
        //     d3.select(`#${d.string}`).attr({
        //         fill: "orange",
        //         r: (d) => radiusScale(d.percent) * 2
        //     });
        // }
        // // add mouseout event to return to normal
        // const handleMouseOut = (d) => {
        //     // Use D3 to select element, change color back to normal
        //     d3.select(`#${d.string}`).attr({
        //         fill: (d) => linearColorScale(d.percent),
        //         r: (d) => radiusScale(d.percent)
        //     });
        // }

        // //append group tag to svg
        // const svg = d3.selectAll("svg")
        //     .append("g")
        // //bind data to the group
        // const circle = svg.selectAll("circle")
        //     .data(shuffledPercentages)  
        // //create circle for each output in percentages - put each circle in it's own group to bind text to it 
        // const g = circle.enter().append("g")
        //     g.append("circle")
        //     .attr('class', 'node')
        //     .attr('id', (d) => `#${d.string}`)
        //     .attr('r', (d) => radiusScale(d.percent))
        //     .style('fill', (d) => linearColorScale(d.percent))
        //     .style('stroke-width', '5px')
        //     .style('stroke', "blue")
        //     .on('mouseover', (e) =>{
        //         console.log(e.currentTarget)
        //         // d3.select(this)
        //         .transition()
        //         .duration(1000)
        //         .attr('stroke-width', 0)
        //     } )
        //     .on('mouseout', () => console.log('bye'))

        // //add text along with the circle
        // g.append("text")
        //     .text((d) => d.string)
        //     .attr('y', (d) => d.y)
        //     .attr('x', (d) => d.x)
        // //click handler to add to training data
        // g.on('click', (d) => this.handleClick(d))

        // //draw lines for nodelinks
        // const nodeLinks = svg.selectAll('line')
        //     .data(links)
        //     .enter()
        //     .append('line')
        //     .style("stroke", "lightgrey")
        //     .style('stroke-opacity', 0.4)

        // const width = 800;
        // const height = 800;
        // // define force simulation
        // const simulation = d3.forceSimulation()
        //     .force("x", d3.forceX(width/2).strength(.005))
        //     .force("y", d3.forceY(height/2).strength(.01))
        //     .force("center", d3.forceCenter().x(width * .5).y(height * .5))
        //     .force("charge", d3.forceManyBody().strength(-15))
        //     .force("collide", d3.forceCollide((d) => radiusScale(d.percent)+ 5).strength(.5))
    
        // //bind nodes and links to simulation 
        // simulation
        //     .nodes(shuffledPercentages)
        //     .force('link', d3.forceLink().links(links).distance(100))
        //     .on("tick", () => {
        //         //translate the axis of the group (text an circle) while it moves
        //         g.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
        //         //redraw link while it moves
        //         nodeLinks
        //             .attr('x1', function (d) {
        //                 return d.source.x 
        //             })
        //             .attr('y1', function (d) {
        //                 return d.source.y 
        //             })
        //             .attr('x2', function (d) {
        //                 return d.target.x 
        //             })
        //             .attr('y2', function (d) {
        //                 return d.target.y 
        //             })
        //     });
        
        // let dataPoints = data.top;
        let graphSelection = d3.select(".chart")
        let width = 800;
        let height = 800;

        // let color = d3.scaleOrdinal(d3.schemeCategory10); 
        let color = d3.scaleLinear()
            .domain([0, data[0].percent])
            .range(['#C6FFDD', '#FBD786', '#f7797d', '#d9a7c7','#89253e']);
        
        //remove all elements from svg
        d3.selectAll("svg").remove();

        // selects the "graph" div on the html page and appends a svg container
        let svgContainer = graphSelection
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)");


        let radiusScale = d3.scaleSqrt().domain([0, data[0].percent]).range([30, 80]);
        // formats numbers by rounding down. ex 6.2 => 6
        let format = d3.format(",d");
        // const shuffledPercentages = this.shuffleData(percentages);

        // the simulation is a collection of forces
        // about where we want our circles to go
        // and how we want our circles to interact

        let forceXCombine = d3.forceX(width / 2).strength(0.05);

        let forceY = d3.forceY(function (d) {
            return height / 2;
        }).strength(0.05); 

        let forceCollide = d3.forceCollide(function (d) {
            return radiusScale(d.percent) + 2;
        })

        let simulation = d3.forceSimulation()
            .force("x", forceXCombine)
            .force("y", forceY)
            .force("collide", forceCollide)

        let circles = svgContainer.selectAll(".node")
            .data(data)
            .enter().append("circle")
            .attr("class", "output")
            .attr("r", function (d) {
                return radiusScale(d.percent);
            })
            .attr("fill", function (d) {
                return color(d.percent);
            })
            .style('z-index', 10)
            .on('click', (d) => this.handleClick(d))
            .on("mouseenter", function (d) {
                // d3.selectAll("circle").style('opacity', 0.3);
                let mouseNode = d3.select(this)
                    mouseNode.style('opacity', 0.3)
                // mouseNode.style('opacity', 1)
                    // mouseNode.transition().duration(200).delay(100).attr('r', 200);
                // mouseNode.style('stroke-width', 5)
                // d3.selectAll("text").attr("visibility", "hidden")

            })
            .on('mouseleave', function (d) {
                // d3.select(this).transition().duration(200).delay(0).attr('r', function (d) {
                //     return radiusScale(d.percent);
                // });
                // d3.select(this).style('stroke-width', 1);
                d3.select(this).style('opacity', 0.95);
                // d3.selectAll("text").attr("visibility", "visible");

            });

        // //draw lines for nodelinks
        const nodeLinks = svgContainer.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .style("stroke", "lightgrey")
            .style('stroke-opacity', 0.4)
            .style('z-index', -4)

        // d3.select("#decade").on("click", function(){
        // 	simulation
        // 		.force("x", forceXSeperate)
        // 		.alphaTarget(0.5)
        // 		.restart()
        // })

        // d3.select("#combine").on("click", function(){
        // 	simulation
        // 		.force("x", forceXCombine)
        // 		.alphaTarget(0.05)
        // 		.restart()
        // })


        let texts = svgContainer.selectAll(null)
            .data(data)
            .enter()
            .append("g")

        texts.append("text")
            .attr("text-anchor", "middle")
            .text((d) => {
                return d.string
            })

        simulation
            .nodes(data)
            .force('link', d3.forceLink().links(links).distance(100))
            .on('tick', ticked);


        function ticked() {
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
        }
         
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

        debugger;
        let trainingData = this.addLettersToTraining(d);

        // d3.select(this).transition().duration(200).delay(100).attr('r', 200)
        
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
