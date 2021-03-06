import React from 'react';
import  { connect } from 'react-redux';
import TrainingCanvas from '../canvas/training_canvas';
import Memory from '../displays/memory';
import { selectTrainedNetwork } from '../../actions/neural_network_actions';

class TrainingView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { currentNetwork, selectTrainedNet } = this.props;

        if (currentNetwork === null || currentNetwork === undefined) {
            selectTrainedNet();
        }

        let particles = document.getElementById('particles-js');
        if (!particles.classList.contains('hidden')){
          particles.classList.add('hidden');
        }
    }

    render() {
        return (
            <div className="training-canvas-view-div">
                <div className="training-canvas-contents">
                    <TrainingCanvas />
                    <Memory />
                </div>
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

export default (connect(mapStateToProps, mapDispatchToProps)(TrainingView));
