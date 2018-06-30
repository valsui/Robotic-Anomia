import React from 'react';

class DoneTraining extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dev-bios-container" id="train-message">
                <div className="light">
                  <p>💡</p>
                </div>
                <div className="dev-bios-text">
                    Robotic Anomia is now done training your data!
                    <br/>
                    Would you like to test it now or train some more data?
                </div>
                <div className="done-training-container">
                    <button>Test!</button>
                    <button>Continue Training</button>
                </div>
            </div>
        )
    }
}

export default DoneTraining;
