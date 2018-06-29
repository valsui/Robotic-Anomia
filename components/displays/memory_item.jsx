import React from 'react';
import { connect } from 'react-redux';
import { removeTestData } from '../../actions/test_data_actions';

class MemoryItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datum: props.datum
        }

        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        const canvas = this.refs.memoryCanvas;
        const ctx = canvas.getContext("2d");

        this.canvas = canvas;
        this.ctx = ctx;

        this.draw(this.ctx);
    }

    draw(ctx) {
        let tempArray = this.state.datum.input;
        let drawArray = [];
        let i = 0;

        ctx.clearRect(0, 0, 50, 50);
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, 50, 50);

        while ( i < 625 ) {
            drawArray.push(tempArray.slice(i, i + 25))

            i += 25;
        }

        for ( let i = 0; i < drawArray.length; i++ ) {
            for ( let j = 0; j < drawArray[0].length; j++ ) {
                if ( drawArray[i][j] === 1 ) {
                    ctx.beginPath();
                    ctx.fillStyle = "#ee66aa";
                    ctx.fillRect(2 * i,2 * j, 2, 2);
                    ctx.fillStyle = "#f49cc8";
                    ctx.fillRect(2 * i,2 * j, 1, 1);
                } else if (drawArray[i][j] >= .75 && drawArray[i][j] < 1 ) {
                    ctx.beginPath();
                    ctx.fillStyle = "#7166ee";
                    ctx.fillRect(2 * i, 2 * j, 2, 2);
                } else if (drawArray[i][j] >= .5 && drawArray[i][j] < 0.75 ) {
                    ctx.beginPath();
                    ctx.fillStyle = "#66a1ee";
                    ctx.fillRect(2 * i, 2 * j, 2, 2);
                } else if (drawArray[i][j] >= 0.25 && drawArray[i][j] < 0.5) {
                    ctx.beginPath();
                    ctx.fillStyle = "#9ce5f4";
                    ctx.fillRect(2 * i, 2 * j, 2, 2);
                } else if (drawArray[i][j] > 0 && drawArray[i][j] < 0.25) {
                    ctx.beginPath();
                    ctx.fillStyle = "#66eece";
                    ctx.fillRect(2 * i, 2 * j, 2, 2);
                    ctx.fillStyle = "#f4f19c";
                    ctx.fillRect(2 * i, 2 * j, 1, 1);
                }
            }
        }
    }

    removeItem(e) {
        e.preventDefault();
        const { idx, removeTestData } = this.props;

        removeTestData(idx);
    }

    render() {
        return (
            <li className="memory-li" onClick={this.removeItem}>
                <canvas ref="memoryCanvas" width={50} height={50}></canvas>
                <div id="talkbubble">Delete</div>
            </li>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    removeTestData: (id) => dispatch(removeTestData(id))
})

export default (connect(null, mapDispatchToProps)(MemoryItem));
