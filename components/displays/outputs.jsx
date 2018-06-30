import React from 'react';
import OutputItem from './output_item';

class Outputs extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { output } = this.props;

        if ( output === null ) {
            return null;
        }

        console.log("outputs", output)
        const outputs = Object.values(output);

        return (
            <div>
                {outputs.map((output, i) => {
                    return <OutputItem key={i} output={output} letter={i + 1}/>
                })}
            </div>
        )
    }
}

export default Outputs;
