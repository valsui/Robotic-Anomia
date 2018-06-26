import React from 'react';
import { connect } from 'react-redux';
import OutputItem from './output_item';

class Outputs extends React.Component {
    constructor(props) {
        super(props);
    }

    //function to sort output by letter
    sortKeysByLetter(output) {
        let keys = Object.keys(output);
        keys.sort();
        return keys.reduce((sortedObj, k) => {
            sortedObj[k] = output[k];
        }, {})
    }
    
    render () {
        const { output } = this.props;
        const outputs = Object.values(output);
        const outputKeys = Object.keys(output);

        return (
            <div className="output-div">
                <h1 className="percentages-header"> Percentages </h1>
                <ul className="outputs-ul">
                    { outputs.map((output, i) => {
                        return <OutputItem key={i} output={output} letter={outputKeys[i]}/>
                    })}
                </ul>
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     outputs: Object.values(state.entities.outputs),
//     outputKeys: Object.keys(state.entities.outputs)
// })

// const mapDispatchToProps = dispatch = ({
// })

export default Outputs;