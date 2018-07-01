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
    }

    handleClick() {
        const { net } = this.props;

        net.trainAsync(this.trainingData).then(() => {
            this.props.resetOutputData()
        });
    }



    render() {
        const { output, letter } = this.props;

        return (
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
