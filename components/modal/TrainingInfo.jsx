import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';

class TrainingInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            moreInfo: false
        }

        this.displayMoreInfo = this.displayMoreInfo.bind(this);
    }

    displayMoreInfo(e) {
        e.preventDefault();
        const moreInfo = this.state.moreInfo;
        this.setState({
            moreInfo: !moreInfo
        })
    }

    displayInstructions(){
        return(
            <div className='instructions' onClick = {(e) => e.stopPropagation()}>
                  <h1>Instructions</h1>
                    <h3>Using Our Default Network</h3>
                    <ol className='training-instructions-default'>
                        <li key='1'>Enter a lower case letter in the first box</li>
                        <li key='2'>Draw the letter on the canvas</li>
                        <li key='3'>Add the letter to memory</li> 
                        <li key='4'>Train the network with the newly added letters</li>
                        <li key='5'>Delete a letter in the memory by clicking on it</li>
                    </ol>
                    <h3>Using Your Own Network</h3>
                    <ol className='training-instructions-own'>
                        <li key='5'>Click on <strong>Use Your Own Network</strong> in the header.</li>
                        <li key='6'>Follow the instructions about in <strong>Using Our Default Network</strong></li>
                    </ol>

                <div onClick = {this.displayMoreInfo} className = "learn-more">Learn More</div>
            </div>
        )
    }

    displayLearning(){
        return(
            <div className='learn-more-info' onClick={(e) => e.stopPropagation()}>
                <div>
                    <span className='learning-span'>
                        Each time the user adds more data to the network, the existing model is retrained with the new data and the model's weights get recalculated with the new batch of data. The training process is the same as the one described in <Link to='/test' onClick={() => this.props.closeModal()}>Play</Link>. Once there is a sufficient amount of new inputs added to the training set, the network will be trained to slightly favor the newly incoming dataset. Although this is not a desirable effect, we were able to gain more insight now how neural networks learned. 
                    </span>
                </div>
                
                <div onClick={this.displayMoreInfo} className="back-to-instructions">Back to Instructions</div>

            </div>
        )
    }

    render() {
        return (
            <div className="training-modal">
                {this.state.moreInfo ? this.displayLearning() : this.displayInstructions()}
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(TrainingInfo));
