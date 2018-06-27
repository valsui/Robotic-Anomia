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


    render() {
        return (
            <li className="memory-li">
                <canvas ref="memoryCanvas" width={50} height={50}></canvas>
            </li>
        )
    }
}

export default MemoryItem;