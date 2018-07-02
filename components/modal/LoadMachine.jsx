import React from 'react';
import { NeuralNetwork } from "brain.js";
import { connect } from 'react-redux';
import { receiveNeuralNetwork, selectNewNetwork } from '../../actions/neural_network_actions';
import { closeModal } from '../../actions/modal_actions';

class LoadMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          input: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
      this.setState({
        input: e.target.value
      })
    }

    handleSubmit(e){
      e.preventDefault()
      const config = {
          iterations: 10000,
          learningRate: 0.3,
          hiddenLayers: [312, 312],
      }
      const net = new brain.NeuralNetwork(config);
      try{
        net.fromJSON(JSON.parse(this.state.input));
      }
      catch(err){
        console.log(err);
      }
      finally{
        this.props.receiveNeuralNetwork("dumbNet", net);
        this.props.selectNewNetwork();
        this.props.closeModal();
      }
    }

    render() {
        return (
            <div className="dev-bios-container" id="load-machine" onClick={(e) => e.stopPropagation()}>
                <div className="dev-bios-text">
                    Copy and paste all the texts in your machines.txt file and input it below
                    <br/>
                    <br/>
                <input className="machine-input" type="text" maxLength="unlimited" value={this.state.input} onChange={this.handleInput}>
                </input>
                </div>
                <button onClick={this.handleSubmit} className = "load-button"> Load </button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  receiveNeuralNetwork: (name, net) => dispatch(receiveNeuralNetwork(name, net)),
  closeModal: () => dispatch(closeModal()),
  selectNewNetwork: () => dispatch(selectNewNetwork())
})

export default connect(null, mapDispatchToProps)(LoadMachine);
