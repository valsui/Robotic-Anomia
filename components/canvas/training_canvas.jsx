import React from 'react';
import { connect } from 'react-redux';
import { createArray, doSimulationStep, reduce, download, outOfBounds } from '../../javascripts/canvas_utils';
import { receiveTestData, resetTestData } from '../../actions/test_data_actions';

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
        this.trainData = this.trainData.bind(this);

    }

    componentDidMount() {
        const canvas = this.refs.trainingCanvas;
        const ctx = canvas.getContext("2d");

        this.setState({
            canvas: canvas,
            ctx: ctx,
            counter: 0
        })


        canvas.addEventListener("mousedown", this.mouseDown());
        canvas.addEventListener("mousemove", this.mouseMove());
        document.addEventListener("mouseup", this.mouseUp());
    }

    componentWillUnmount() {
        const { canvas } = this.state;

        this.props.resetTestData();

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

    draw(event) {
        const that = this;
        const { ctx, canvas, array } = this.state;

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

    sendData(e) {
        e.preventDefault();

        if ( this.state.letter.length < 1 ) {
            console.log("please enter one letter");
            return;
        } else if ( this.state.letter.length > 1 ) {
            console.log("please only enter one letter");
            return;
        }

        let newArray = doSimulationStep(this.array);
        let tempArray = reduce(newArray)[0];
        let newArr = [];
        let consoleLogArray = []

        for ( let i = 0; i < tempArray.length; i++ ) {
             newArr = newArr.concat(tempArray[i].slice(0,25));
             consoleLogArray.push(tempArray[i].slice(0,25))
        }
        
        let data = { [this.state.counter]: { input: newArr, output: {[this.state.letter]: 1} } }

        this.setState({
            counter: this.state.counter + 1
        })
        
        this.props.receiveTestData(data);
        this.resetCanvas();
    }

    resetCanvas() {
        const { ctx, canvas } = this.state;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(255,255,255,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.array = createArray();
    }

    changeLetter(e) {
        e.preventDefault();

        this.setState({
            letter: e.currentTarget.value
        })
    }

    trainData(e) {
        e.preventDefault();

        let data = [];
        this.props.data.forEach ((datum) => {
            data.push(JSON.stringify(datum))
        })
        let filename = document.getElementById("filename");
        download(filename.value, data.toString());
        this.props.resetTestData();
    }

    render() {
        return (
            <div className="training-canvas-div">
              <input onChange={this.changeLetter} value={this.state.letter} />
                <canvas ref="trainingCanvas" width={200} height={200} />
                <button onClick={this.sendData}>Add to Memory</button>
                <button onClick={(e) => {e.preventDefault(); this.resetCanvas()}}>Clear Canvas</button>

                <form>
                    <button onClick={this.trainData}>Download Data</button>
                    <input id="filename" type="text" name="name" value="data.txt"/>
                    <input id="download" type="submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: Object.values(state.entities.testData)
})

const mapDispatchToProps = dispatch => ({
    receiveTestData: (data) => dispatch(receiveTestData(data)),
    resetTestData: () => dispatch(resetTestData())
})

export default (connect(mapStateToProps, mapDispatchToProps)(TrainingCanvas));
