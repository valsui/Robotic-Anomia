import React from 'react';
import { connect } from 'react-redux';
import { doSimulationStep, reduce, outOfBounds } from '../../javascripts/canvas_utils';
import { receiveOutputData, receiveArrayShapes, resetOutputData } from '../../actions/test_data_actions';
import { createMachine } from '../../javascripts/api_utils';
import { openModal, receiveText } from '../../actions/modal_actions';


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
        this.download = this.download.bind(this);
        this.displayDownloadInfo = this.displayDownloadInfo.bind(this);
        this.displayLoadInfo = this.displayLoadInfo.bind(this);
        this.displayNetworkInfo = this.displayNetworkInfo.bind(this);
    }

    componentDidMount() {
        const canvas = this.refs.testingCanvas;
        const ctx = canvas.getContext("2d");
        // console.log(this.props);
        // this.readTextFromFile("http://localhost:8000/machine.txt");
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

    readTextFromFile(file){
      let rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = () => {
        if(rawFile.readyState === 4){
          if(rawFile.status === 200 || rawFile.status == 0){
            this.setState({
              loadedMachine: this.props.trainedNet.fromJSON(JSON.parse(rawFile.responseText)),
            })
          }
        }
      }
      rawFile.send(null);
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
      ctx.setLineDash([5, 10]);
      ctx.rect(box.left, box.top + 30, box.right - box.left, box.bottom - box.top - 50);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

    sendData(e) {
        e.preventDefault();
        let newArray = doSimulationStep(this.array);
        let tempArray = reduce(newArray);
        let newArr = [];
        const { canvas } = this.state;
        const { trainedNet, dumbNet, currentNetwork } = this.props;

        newArr = tempArray.map( (object) => {
            // this.drawBox(object);
            let mapSubArray = [];
            for (let i = 0; i < object.array.length; i++) {
                mapSubArray = mapSubArray.concat(object.array[i].slice(0, 25));
            }
            return mapSubArray;
        })

       if ( newArr.length === 0) {
           return;
       }

        let outputArray = [];

       newArr.forEach((array) => {
           if ( currentNetwork === "trainedNet" ) {
               outputArray.push(trainedNet.run(array));
           } else if ( currentNetwork === "dumbNet" ) {
               outputArray.push(dumbNet.run(array))
           }
       })

       this.props.receiveArrayShapes(newArr);
       this.props.receiveOutputData(outputArray);
       this.matrixify();

        canvas.removeEventListener("mousedown", this.mousedownFunc);
        canvas.removeEventListener("mousemove", this.mousemove);

        setTimeout(() => this.resetCanvas(), 3000);
        setTimeout(() => canvas.addEventListener("mousedown", this.mousedownFunc), 3000);
        setTimeout(() => canvas.addEventListener("mousemove", this.mousemove), 3000);

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
    }

    download(){
      let data;
      if ( this.props.currentNetwork === "trainedNet" ) {
        data = this.props.trainedNet.toJSON();
      } else if ( this.props.currentNetwork === "dumbNet" ) {
        data = this.props.dumbNet.toJSON();
      }
      createMachine(JSON.stringify(data));
    }

    displayDownloadInfo(e) {
        e.preventDefault();
        this.props.receiveText('Download your trained machine as a .txt file.')
    }

    displayLoadInfo(e) {
        e.preventDefault();
        this.props.receiveText('Open your machine.txt and paste your whole machine as a text string')
    }

    displayNetworkInfo(e) {
        e.preventDefault();
        this.props.openModal("testingInfo");
    }
    render() {
        // let data = this.props.trainedNet.toJSON();
        // console.log(data);
        // if(data){
        //   createMachine(JSON.stringify(data));
        // }
        // console.log(this.state);
        // let data = this.props.dumbNet.toJSON();
        // if(data){
        //   createMachine(JSON.stringify(data));
        // }
        return (
            <div className="testing-canvas-div">
                <i className="far fa-question-circle testing-info" id="question-mark3" onClick={this.displayNetworkInfo}></i>
                <div className="testing-canvas-container">
                    <canvas ref="testingCanvas" width={800} height={200} />
                </div>
                <div className="testing-canvas-button-container">
                    <button onClick={this.sendData} className="test-button" id="read">Read This</button>
                    <button className="test-button" onClick={(e) => {e.preventDefault(); this.resetCanvas()}}>Clear Canvas</button>
                      <button onClick={this.download} className="test-button" id="DL">Download Machine</button>
                      <i className="far fa-question-circle download-info" id="question-mark1" onClick = {this.displayDownloadInfo}></i>
                      <button onClick={this.props.openModal("LoadMachine")} className="test-button" id="LM">Load Machine</button>
                      <i className="far fa-question-circle load-info" id="question-mark2" onClick = {this.displayLoadInfo}></i>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    trainedNet: state.entities.neuralNetworks.trainedNet,
    dumbNet: state.entities.neuralNetworks.dumbNet,
    currentNetwork: state.ui.currentNetwork
})

const mapDispatchToProps = dispatch => ({
    receiveOutputData: (data) => dispatch(receiveOutputData(data)),
    receiveArrayShapes: (data) => dispatch(receiveArrayShapes(data)),
    openModal: (modal) => dispatch(openModal(modal)),
    resetOutputData: () => dispatch(resetOutputData()),
    receiveText: (text) => dispatch(receiveText(text))
})

export default (connect(mapStateToProps, mapDispatchToProps)(TestingCanvas));
