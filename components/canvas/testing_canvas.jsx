import React from 'react';
import { connect } from 'react-redux';
import { createArray, doSimulationStep, reduce, download } from '../../javascripts/canvas_utils';

class TestingCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null,
            letter: ""
        }

        this.array = createArray();
        this.sendData = this.sendData.bind(this);
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

    componentDidUnmount() {
        canvas.removeEventListener("mousedown", this.mouseDown());
        canvas.removeEventListener("mousemove", this.mouseMove());
        document.removeEventListener("mouseup", this.mouseUp());
    }

    mouseDown() {
        const that = this;

        return (event) => {
            that.mousedown = true;
            that.draw(event);
        }
    }

    mouseMove() {
        const that = this;

        return (event) => {
            that.draw(event);
        }
    }

    mouseUp() {
        const that = this;

        return (event) => {
            that.mousedown = false;
            that.state.ctx.beginPath();
        }
    }



    createArray() {
        let array = [];

        for (let i = 0; i < 50; i++) {
            let row = [];

            for (let j = 0; j < 50; j++) {
                row.push(0);
            }

            array.push(row);
        }

        return array;
    }

    draw(event) {
        const that = this;
        const { ctx, canvas, array } = this.state;

        if (that.mousedown) {
            const rect = canvas.getBoundingClientRect();
            let x = Math.floor((event.clientX - rect.left));
            let y = Math.floor((event.clientY - rect.top));
            let arrX = Math.floor(x / 2);
            let arrY = Math.floor(y / 2);
            this.array[arrX][arrY] = 1;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 12;
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            canvas.style.cursor = "pointer";
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }

    sendData(e) {
        e.preventDefault();
        let newArray = doSimulationStep(this.array);
        let tempArray = reduce(newArray);
        let newArr = [];
        let consoleLogArray = [];


        for (let i = 0; i < tempArray.length; i++) {
            newArr = newArr.concat(tempArray[i].slice(0, 25));
            consoleLogArray.push(tempArray[i].slice(0, 25))
        }

        console.log(consoleLogArray);
        console.log(this.props.trainedNet.run(newArr));

        this.resetCanvas();
    }

    resetCanvas() {
        const { ctx, canvas } = this.state;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.array = createArray();
    }

    render() {
        return (
            <div className="testing-canvas-div">
                Testing Canvas
                <canvas ref="testingCanvas" width={100} height={100} />
                <button onClick={this.sendData}>Test!</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trainedNet: state.entities.neuralNetworks.trainedNet
})

const mapDispatchToProps = dispatch => ({
})

export default (connect(mapStateToProps, null)(TestingCanvas));