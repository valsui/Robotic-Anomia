import React from 'react';
import { connect } from 'react-redux';
import Outputs from './outputs';

class OutputContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="output-wrapper">
                { this.props.outputs.map((output, i) => {
                    return <Outputs key={i} output={output} />
                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    outputs: state.entities.outputs
})

export default (connect(mapStateToProps, null)(OutputContainer))