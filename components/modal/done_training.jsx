import React from 'react';
import { withRouter } from 'react-router-dom';

class DoneTraining extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToTest = this.redirectToTest.bind(this);
    }

    redirectToTest(e) {
        e.preventDefault();
        this.props.history.push('/test');
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
                    <button onClick={this.redirectToTest}>Test!</button>
                    <button>Continue Training</button>
                </div>
            </div>
        )
    }
}

export default withRouter(DoneTraining);
