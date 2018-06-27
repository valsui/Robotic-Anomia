import React from 'react';

class MemoryItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datum: props.datum
        }
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

        ctx.clearRect(0, 0, 25, 25);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 25, 25);

        while ( i < 625 ) {
            drawArray.push(tempArray.slice(i, i + 25))

            i += 25;
        }

        for ( let i = 0; i < drawArray.length; i++ ) {
            for ( let j = 0; j < drawArray[0].length; j++ ) {
                if ( drawArray[i][j] === 1 ) {
                    ctx.beginPath();
                    ctx.fillStyle = "#30B2F9";
                    ctx.fillRect(i,j, 1, 1);
                }
            }
        }
    }


    render() {
        return (
            <li className="memory-li">
                <canvas ref="memoryCanvas" width={25} height={25}></canvas>
            </li>
        )
    }
}

export default MemoryItem;
