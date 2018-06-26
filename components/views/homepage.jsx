import React from 'react';
import { connect } from 'react-redux';

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.linkTest = this.linkTest.bind(this);
        this.linkTrain = this.linkTrain.bind(this);
    }

    linkTest() {
        this.props.history.push('/test');
    }

    linkTrain() {
        this.props.history.push('/train');
    }

    render() {
        return(
            <div className="homepage-div">
                <div className="homepage-content">
                    <div className="homepage-content-center">
                        <div className="text-info">
                            Welcome to Robotic Anomia:
                            Please choose a mode
                        </div>
                        <div className="homepage-button-div">
                            <div className="homepage-button" onClick={this.linkTest}>
                                Play with Robotic Anomia.
                            </div>
                            <div className="homepage-button" onClick={this.linkTrain}>
                                Train Robotic Anomia.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = null;

export default (connect(mapStateToProps, mapDispatchToProps)(Homepage))