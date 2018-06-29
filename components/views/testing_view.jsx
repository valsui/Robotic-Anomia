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
    }

    render() {
        return (
            <div className="testing-canvas-view-div">
                <TestingCanvas />
                <OutputContainer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentNetwork: state.ui.currentNetwork
})

const mapDispatchToProps = dispatch => ({
    selectTrainedNet: () => dispatch(selectTrainedNetwork())
})

export default connect(mapStateToProps, mapDispatchToProps)(TestingView);
