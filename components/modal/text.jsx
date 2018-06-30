import React from 'react';
import { connect } from 'react-redux';

class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <div className="text-container">
                <h1 className="error-text">{this.props.text}</h1>
            </div>
        ) 
    }
}

const mapStateToProps = state => ({
    text: state.entities.text
})

export default connect(mapStateToProps,null)(Text);
