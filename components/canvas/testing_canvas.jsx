import React from 'react';
import { connect } from 'react-redux';
import { doSimulationStep, reduce, outOfBounds } from '../../javascripts/canvas_utils';
import { receiveOutputData } from '../../actions/test_data_actions';
import { imageToMatrix } from '../../javascripts/heatmap';

class TestingCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null,
            letter: ""
        }

        this.array = this.createArray();
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

    componentWillUnmount() {
        const { canvas } = this.state;

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

        for (let i = 0; i < 200; i++) {
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
        const { ctx, canvas } = this.state;

        if (that.mousedown) {
            const rect = canvas.getBoundingClientRect();
            let x = Math.floor((event.clientX - rect.left));
            let y = Math.floor((event.clientY - rect.top));
            let arrX = Math.floor(x / 4);
            let arrY = Math.floor(y / 4);
        
            if (!outOfBounds(this.array, arrX - 1, arrY - 1)) this.array[arrX - 1][arrY - 1] = 1;
            if (!outOfBounds(this.array, arrX, arrY - 1)) this.array[arrX][arrY - 1] = 1;
            if (!outOfBounds(this.array, arrX - 1, arrY)) this.array[arrX - 1][arrY] = 1;
            if (!outOfBounds(this.array, arrX, arrY)) this.array[arrX][arrY] = 1;
            if (!outOfBounds(this.array, arrX, arrY + 1)) this.array[arrX][arrY + 1] = 1;
            if (!outOfBounds(this.array, arrX + 1, arrY)) this.array[arrX + 1][arrY] = 1;
            if (!outOfBounds(this.array, arrX + 1, arrY + 1)) this.array[arrX + 1][arrY + 1] = 1;
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
     

        newArr = tempArray.map( (subArray) => { 
            let mapSubArray = [];
            for (let i = 0; i < subArray.length; i++) {
                mapSubArray = mapSubArray.concat(subArray[i].slice(0, 25));
            }

            return mapSubArray
        })

        let outputArray = [];
        console.log('newArr:', newArr);
        newArr.forEach((array) => {
            console.log('array:',array);
            console.log('matrixed:', imageToMatrix(array));
           outputArray.push(this.props.trainedNet.run(array))
       })

       this.props.receiveOutputData(outputArray);

        this.resetCanvas();
    }

    matrixify() {
        const { ctx } = this.state;
        const array = this.array;

        for ( let i = 0; i < array.length; i++ ) {
            for ( let j = 0; j < array[i].length; j++ ) {
                if ( array[i][j] === 1 ) {
                    console.log(array[i][j])
                    ctx.font = "20px serif";
                    ctx.fillStyle = "green";
                    ctx.strokeText("1", i + 16, j + 16)
                } else {
                    ctx.font = "20px serif";
                    ctx.fillStyle = "black";
                    ctx.strokeText("0", i + 16, j + 16)
                }
            }
        }
    }

    resetCanvas() {
        const { ctx, canvas } = this.state;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.array = this.createArray();
    }

    render() {
        return (
            <div className="testing-canvas-div">
                Testing Canvas
                <div className="testing-canvas-container">
                    <canvas ref="testingCanvas" width={800} height={200} />
                </div>
                <button onClick={this.sendData}>Test!</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trainedNet: state.entities.neuralNetworks.trainedNet
})

const mapDispatchToProps = dispatch => ({
    receiveOutputData: (data) => dispatch(receiveOutputData(data))
})

export default (connect(mapStateToProps, mapDispatchToProps)(TestingCanvas));
