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
            <div className="training-canvas-div">
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