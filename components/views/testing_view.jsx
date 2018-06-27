import React from 'react';
import { connect } from 'react-redux';
import TestingCanvas from '../canvas/testing_canvas';
import OutputContainer from '../displays/outputs_container';

class TestingView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
<<<<<<< HEAD
            <div className="testing-canvas-view-div">
=======
            <div className="training-canvas-view-div">
>>>>>>> 43a53fefb3ee3c78270b90d1f12a903afad9aab0
                <TestingCanvas />
                <OutputContainer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = null;

export default (connect(mapStateToProps, mapDispatchToProps)(TestingView));
