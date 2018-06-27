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
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 50, 50);
        
        while ( i < 625 ) {
            drawArray.push(tempArray.slice(i, i + 25))

            i += 25;
        }

        for ( let i = 0; i < drawArray.length; i++ ) {
            for ( let j = 0; j < drawArray[0].length; j++ ) {
                if ( drawArray[i][j] === 1 ) {
                    ctx.beginPath();
                    ctx.fillStyle = "red";
                    ctx.fillRect(2 * i,2 * j, 2, 2);
                } else if (drawArray[i][j] > .5 && drawArray[i][j] < 1 ) {
                    ctx.beginPath();
                    ctx.fillStyle = "orange";
                    ctx.fillRect(2 * i, 2 * j, 2, 2);
                } else if (drawArray[i][j] > 0 ) {
                    ctx.beginPath();
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(2 * i, 2 * j, 2, 2);
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
            </li>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    removeTestData: (id) => dispatch(removeTestData(id))
})

export default (connect(null, mapDispatchToProps)(MemoryItem));