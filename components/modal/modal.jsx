import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.escapeModal.bind(this);
        this.component = null;
    }


    componentDidUpdate() {
        this.component.addEventListener('keydown', (event) => this.escapeModal(event));
    }

    escapeModal(event) {
        if ( event.key === 'Escape' || event.keyCode === 27 ) {
            this.props.closeModal();
        }
    }

    render() {
        const { modal, closeModal } = this.props;

        if ( !modal ) {
            return null;
        }

        switch (modal) {
            default: 
                return null;
        }

        return ( 
            <div id="modal-div" className="modal-background" onClick={closeModal}>
                <div className="modal-child" onClick={(e) => e.stopPropogation()}>
                    { this.component }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    modal: state.ui.modal
})

const mapDispatchToProps = dispatch => ({
    closeModal: () =>  dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);




