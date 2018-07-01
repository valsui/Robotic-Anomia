import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';

class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {
        this.props.closeModal();
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

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Text);
