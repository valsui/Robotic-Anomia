import React from 'react';
import { connect } from 'react-redux';
import TestingCanvas from '../canvas/testing_canvas';
import OutputContainer from '../displays/outputs_container';
import { selectTrainedNetwork } from '../../actions/neural_network_actions';

class TestingView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { currentNetwork, selectTrainedNet } = this.props;

        if ( currentNetwork === null || currentNetwork === undefined ) {
            selectTrainedNet();
        }
        
        let particles = document.getElementById('particles-js');
        if (!particles.classList.contains('hidden')){
          particles.classList.add('hidden');
        }
    }

    render() {
        return (
            <div className="testing-canvas-view-div">
                <TestingCanvas />
                { this.props.outputs.length === 0 ? (
                    <h1 className="reminder"> Please space out your letters and write in lower case on the canvas above. </h1>
                ) : ( <OutputContainer /> ) }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentNetwork: state.ui.currentNetwork,
    outputs: state.entities.outputs
})

const mapDispatchToProps = dispatch => ({
    selectTrainedNet: () => dispatch(selectTrainedNetwork())
})

export default connect(mapStateToProps, mapDispatchToProps)(TestingView);
