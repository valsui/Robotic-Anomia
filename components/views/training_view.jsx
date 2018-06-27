import React from 'react';
import  { connect } from 'react-redux';
import TrainingCanvas from '../canvas/training_canvas';
import Memory from '../displays/memory';

class TrainingView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="training-canvas-view-div">
                <TrainingCanvas />
                <Memory />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
})

const mapDispatchToProps = null;

export default (connect(mapStateToProps, mapDispatchToProps)(TrainingView));