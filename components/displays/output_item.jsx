import React from 'react';

const OutputItem = (props) => {
    const { output, letter } = props;
    const percentage = Math.round(output*100)

    return (
        <li className="output-percentage"> {letter} : {percentage} % </li>
    )
}

export default OutputItem