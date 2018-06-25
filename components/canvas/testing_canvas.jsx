import React from 'react';
import { connect } from 'react-redux';
import { createArray } from '../../javascripts/canvas_utils';

class TestingCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null
        }

        this.mousedown = false;
    }

    componentDidMount() {
        const canvas = this.refs.testingCanvas;
        const ctx = canvas.getContext("2d");

        this.setState({
            canvas: canvas,
            ctx: ctx
        })

        canvas.addEventListener("mousedown", this.mouseDown());
        canvas.addEventListener("mousemove", this.mouseMove());
        document.addEventListener("mouseup", this.mouseUp());
    }

    componentDidUnMount() {
        canvas.removeEventListener("mousedown", this.mouseDown());
        canvas.removeEventListener("mousemove", this.mouseMove());
        document.removeEventListener("mouseup", this.mouseUp());
    }

    mouseDown() {
        return (event) => {
            this.mousedown = true;
            this.draw(event);
        }
    }

    mouseMove() {
        return (event) => {
            this.draw(event);
        }
    }

    mouseUp() {
        return (event) => {
            this.mousedown = false;
            this.context.beginPath();
        }
    }

    draw(event) {
        if (this.mousedown) {
            const rect = this.canvas.getBoundingClientRect();
            let x = Math.floor((event.clientX - rect.left));
            let y = Math.floor((event.clientY - rect.top));
            let arrX = Math.floor(x / 2);
            let arrY = Math.floor(y / 2);
            this.array[arrX][arrY] = 1;
            this.context.lineTo(x, y);
            this.context.stroke();
            this.context.strokeStyle = "black";
            this.context.lineWidth = 12;
            this.context.arc(x, y, 6, 0, Math.PI * 2);
            this.context.fillStyle = "black";
            this.context.fill();
            this.canvas.style.cursor = "pointer";
            this.context.beginPath();
            this.context.moveTo(x, y);
        }
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