import React from 'react';
import { connect } from 'react-redux';
import { createArray, doSimulationStep, reduce, download } from '../../javascripts/canvas_utils';
import { receiveTestData } from '../../actions/test_data_actions';

class TrainingCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null,
            letter: ""
        }

        this.array = createArray();
        this.sendData = this.sendData.bind(this);
        this.changeLetter = this.changeLetter.bind(this);
    }

    componentDidMount() {
        const canvas = this.refs.trainingCanvas;
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

        while ( tempArray[0].length > 25 ) {
            newArray = doSimulationStep(this.array);
            tempArray = reduce(newArray);
        }

        this.array = tempArray;

        let data = { input: [this.array.toString()], output: {[this.state.letter]: 1} }
        
        this.props.receiveTestData(data);
    }

    changeLetter(e) {
        e.preventDefault();
        this.setState({
            letter: e.currentTarget.value
        })
    }

    render() {
        return (
            <div className="training-canvas-div">
                <canvas ref="trainingCanvas" width={100} height={100} />
                <input onChange={this.changeLetter} value={this.state.letter} />
                <button onClick={this.sendData}>Add Data</button>
                <button onClick={this.download}>Download Data</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.entities.testData
})

const mapDispatchToProps = dispatch => ({
    receiveTestData: (data) => dispatch(receiveTestData(data))
})

export default (connect(mapStateToProps, mapDispatchToProps)(TrainingCanvas));