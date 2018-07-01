import React from 'react';
import { connect } from 'react-redux';

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
            <div onClick = {(e) => e.stopPropagation()}>
                <div>Instructions</div>
                
                <div onClick = {this.displayMoreInfo}>learn more</div>
            </div>
        )
    }

    displayLearning(){
        return(
            <div onClick={(e) => e.stopPropagation()}>
                <div>Learning</div>
                <div onClick={this.displayMoreInfo}>back to instructions</div>

            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.moreInfo ? this.displayLearning() : this.displayInstructions()}
            </div>
        )
    }
    
}

export default TrainingInfo;