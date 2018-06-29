import React from 'react'; 

class DoneTraining extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dev-bios-container">
                <div className="dev-bios-text">
                    Robotic Anomia is now done training your data.  Would you like to test it now or train some more data?
                </div>
                <br />
                <br />
                <div className="done-training-container">
                    <button>Continue Training</button>
                    <button>Test!</button>
                </div>
            </div> 
        )
    }
}

export default DoneTraining;