import React from 'react';
import { connect } from 'react-redux';
import { resetOutputData } from '../../actions/test_data_actions';
import * as d3 from "d3";

class OutputItem extends React.Component {
    constructor(props) {
        super(props)

        this.trainingData = [];

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { arrayShapes, output } = this.props;
        const letters = output.string.split("");
        
        arrayShapes.forEach((array, i) => {
            let obj = {};
            obj["input"] = array;
            obj["output"] = {
                [letters[i]]: 1
            }

            this.trainingData.push(obj);
        })

        console.log("trainingData", this.trainingData);
        this.drawSelf();
    }

    componentDidUpdate() {
        this.drawSelf();
    }

    drawSelf() {
        const { output } = this.props

        const svg = d3.selectAll("svg");
        console.log("svg", svg);

        let node = output;

        node.x = Math.random() * 800;
        node.y = Math.random() * 200;

        let nodeArray = [];

        nodeArray.push(node);

        svg.append("g")
            .attr('transform', 'translate(30,30)')

        const circle = svg.selectAll("circle")
            .data(nodeArray)
        const g = circle.enter().append("g")
            g.append("circle")
            .attr('r', 40)
            .attr('cy', (d) => d.y)
            .attr('cx', (d) => d.x)
            .attr('class', 'node')
            .style('fill', 'white')
            .style('stroke-width', '5px')
            .style('stroke', "blue")
    }

    handleClick() {
        const { net } = this.props;

        net.trainAsync(this.trainingData).then(() => {
            this.props.resetOutputData()
            console.log("done training!");
        });
    }
    
    
    
    render() {
        const { output, letter } = this.props;
        
        return (
            // <li onClick={this.handleClick} className="output-percentage"> {letter} : {output}  </li>
            <div></div>
        )
    }
}



const mapStateToProps = state => ({
    arrayShapes: state.entities.arrayShapes,
    net: state.entities.neuralNetworks.trainedNet
})

const mapDispatchToProps = dispatch => ({
    resetOutputData: () => dispatch(resetOutputData())
})


export default (connect(mapStateToProps, mapDispatchToProps)(OutputItem));