import React from 'react';
import { connect } from 'react-redux';
import TestingCanvas from '../canvas/testing_canvas';
import Outputs from '../displays/outputs';

class TestingView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="training-canvas-div">
                <TestingCanvas />
                <Outputs />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = null;

export default (connect(mapStateToProps, mapDispatchToProps)(TestingView));