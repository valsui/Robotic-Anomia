import React from 'react';
import { connect } from 'react-redux';
import { selectTrainedNetwork, selectNewNetwork } from '../../actions/neural_network_actions';
import { withRouter } from 'react-router-dom';

class NetworkSelector extends React.Component {
    constructor(props) {
        super(props);

        this.useTrained = this.useTrained.bind(this);
        this.useNew = this.useNew.bind(this);
    }

    useTrained(e) {
        e.preventDefault();
        this.props.selectTrainedNetwork();
    }

    useNew(e) {
        e.preventDefault();
        this.props.selectNewNetwork();
    }

    render() {
        const { currentNetwork, location } = this.props;

        if ( currentNetwork === null || currentNetwork === undefined || location.pathname === "/" ) {
            return (<div className="network-selector-div"></div>);
        } else if ( currentNetwork === "trainedNet" ) {
            return (
                <div className="network-selector-div">
                    <div className="network-selector-container">
                        <button className="trained-net-button selected-network">Use Default Network</button>
                        <button className="new-net-button" onClick={this.useNew} >Use Your Own Network</button>
                    </div>
                </div>
            )
        } else if ( currentNetwork === "dumbNet" ) {
            return (
                <div className="network-selector-div">
                    <div className="network-selector-container">
                        <button className="trained-net-button" onClick={this.useTrained}>Use Default Network</button>
                        <button className="new-net-button selected-network" >Use Your Own Network</button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentNetwork: state.ui.currentNetwork
})

const mapDispatchToProps = dispatch => ({
    selectTrainedNetwork: () => dispatch(selectTrainedNetwork()),
    selectNewNetwork: () => dispatch(selectNewNetwork())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NetworkSelector));
