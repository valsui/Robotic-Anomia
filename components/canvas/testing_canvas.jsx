import React from 'react';

class TestingCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null
        }
    }

    componentDidMount() {
        const canvas = this.refs.testingCanvas;
        const ctx = canvas.getContext("2d");

        this.setState({
            canvas: canvas,
            ctx: ctx
        })
    }

    render() {
        return (
            <div className="testing-canvas=div">
                <canvas ref="testingCanvas" width={800} height={200} />
            </div>
        )
    }
}

export default TestingCanvas;