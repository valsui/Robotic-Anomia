import React from 'react';
import { connect } from 'react-redux';
import OutputItem from './output_item';

class Outputs extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        const { output } = this.props;
        debugger;

        if ( output === null ) {
            return null;
        }
        const outputs = Object.keys(output);

        return (
            <div className="output-div">
                <h1 className="percentages-header"> Percentages </h1>
                <ul className="outputs-ul">
                    { outputs.map((output, i) => {
                        return <OutputItem key={i} output={output} letter={i + 1}/>
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