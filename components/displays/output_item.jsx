import React from 'react';

const OutputItem = (props) => {
    const { output, letter } = props;

    return (
        <li className="output-percentage"> {letter} : {output}  </li>
    )
}

export default OutputItem