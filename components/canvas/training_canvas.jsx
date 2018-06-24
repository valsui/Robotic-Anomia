import React from 'react';

class TrainingCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null
        }
    }

    componentDidMount() {
        const canvas = this.refs.trainingCanvas;
        const ctx = canvas.getContext("2d");

        this.setState({
            canvas: canvas,
            ctx: ctx
        })
    }

    render() {
        return (
            <div className="training-canvas-div">
                <canvas ref="trainingCanvas" width={100} height={100} />
            </div>
        )
    }
}

export default TrainingCanvas;