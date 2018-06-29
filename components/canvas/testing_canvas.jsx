import React from 'react';
import { connect } from 'react-redux';
import { doSimulationStep, reduce, outOfBounds } from '../../javascripts/canvas_utils';
import { receiveOutputData, receiveArrayShapes } from '../../actions/test_data_actions';
import d3 from 'd3';

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

        this.mousedownFunc = this.mouseDown();
        this.mousemove = this.mouseMove();
        this.mouseup = this.mouseUp();


        canvas.addEventListener("mousedown", this.mousedownFunc);
        canvas.addEventListener("mousemove", this.mousemove);
        document.addEventListener("mouseup", this.mouseup);
    }

    componentWillUnmount() {
        const { canvas } = this.state;

        canvas.removeEventListener("mousedown", this.mousedownFunc);
        canvas.removeEventListener("mousemove", this.mousemove);
        document.removeEventListener("mouseup", this.mouseup);
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
            if (!outOfBounds(this.array, arrX - 1, arrY + 1)) this.array[arrX - 1][arrY + 1] = 1;
            if (!outOfBounds(this.array, arrX + 1, arrY - 1)) this.array[arrX + 1][arrY - 1] = 1;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.strokeStyle = "#30B2F9";
            ctx.lineWidth = 12;
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = "#30B2F9";
            ctx.fill();
            canvas.style.cursor = "pointer";
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }

    drawBox(box) {
      const { ctx } = this.state;
      ctx.beginPath();
      ctx.rect(box.left, box.top, box.right - box.left, box.bottom - box.top);
      ctx.lineWidth = 7;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
    sendData(e) {
        e.preventDefault();
        let newArray = doSimulationStep(this.array);
        let tempArray = reduce(newArray);
        let newArr = [];
        const { canvas } = this.state;

        newArr = tempArray.map( (object) => {
            // this.drawBox(object);
            let mapSubArray = [];
            for (let i = 0; i < object.array.length; i++) {
                mapSubArray = mapSubArray.concat(object.array[i].slice(0, 25));
            }
            return mapSubArray;
        })

        let outputArray = [];

       newArr.forEach((array) => {
           outputArray.push(this.props.trainedNet.run(array));
       })

       this.props.receiveArrayShapes(newArr);
       this.props.receiveOutputData(outputArray);
       this.matrixify();

        canvas.removeEventListener("mousedown", this.mousedownFunc);
        canvas.removeEventListener("mousemove", this.mousemove);

        this.mousedownFunc = this.mouseDown();
        this.mousemove = this.mouseMove();
    
       window.setTimeout(this.resetCanvas.bind(this), 2000);
       window.setTimeout(() => canvas.addEventListener("mousedown", this.mousedownFunc), 2000);
       window.setTimeout(() => canvas.addEventListener("mousemove", this.mousemove), 2000);
    }

    matrixify() {
        const { canvas, ctx } = this.state;
        const array = this.array;
        for (var x = 0; x < canvas.width / 4; x += 4) {
          var row = array[x];
          for (var y = 0; y < canvas.height / 4 ; y += 4) {
            ctx.fontSize = "14px"
            ctx.fillStyle = "rgba(255,255,255,0.25)";
            ctx.textAlign = "center";
            ctx.fillText("0",x * 4 + 8 ,y * 4);
            ctx.fillStyle = "rgba(255,255,255,0.06)";
            ctx.textAlign = "center";
            ctx.fillText("0",x * 4 + 8 ,y * 4 + 8);
            ctx.fillText("0",x * 4 ,y * 4 + 8);
            ctx.fillText("0",x * 4 ,y * 4);
          }
        }

        for (var x = 0; x < canvas.width / 4; x += 2) {
          var row = array[x];
          for (var y = 0; y < canvas.height / 4 ; y += 2) {
            if (array[x][y] === 1) {
                ctx.fontSize = "20px";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("1", x * 4, y * 4 + 4)
            }
          }
        }
    }

    resetCanvas() {
        const { ctx, canvas } = this.state;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(255,255,255,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.array = this.createArray();
        // d3.selectAll("svg > *").remove();
    }

    render() {
        return (
            <div className="testing-canvas-div">
                <div className="testing-canvas-container">
                    <canvas ref="testingCanvas" width={800} height={200} />
                </div>
                <div className="testing-canvas-button-container">
                    <button onClick={this.sendData} className="test-button">Read This</button>
                    <button className="test-button" onClick={(e) => {e.preventDefault(); this.resetCanvas()}}>Clear Canvas</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    trainedNet: state.entities.neuralNetworks.trainedNet
})

const mapDispatchToProps = dispatch => ({
    receiveOutputData: (data) => dispatch(receiveOutputData(data)),
    receiveArrayShapes: (data) => dispatch(receiveArrayShapes(data))
})

export default (connect(mapStateToProps, mapDispatchToProps)(TestingCanvas));
