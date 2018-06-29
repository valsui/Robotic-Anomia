import React from 'react';
import { connect } from 'react-redux';
import { resetCurrentNetwork } from '../../actions/neural_network_actions';

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.linkTest = this.linkTest.bind(this);
        this.linkTrain = this.linkTrain.bind(this);
    }

    // componentDidMount() {
    //     this.props.resetCurrentNetwork();
    // }

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

const mapDispatchToProps = dispatch => ({
    resetCurrentNetwork: () => dispatch(resetCurrentNetwork())
})

export default (connect(mapStateToProps, mapDispatchToProps)(Homepage))
