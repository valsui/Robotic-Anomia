import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import DevBios from "./dev_bios";
import DoneTraining from './done_training';
import Text from './text';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.escapeModal.bind(this);
        this.component = null;
    }


    componentDidMount() {
        document.addEventListener('keydown', (event) => this.escapeModal(event));
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
            case "devBios":
                this.component = <DevBios />;
                break;
            case "doneTraining":
                this.component = <DoneTraining />;
                break;
            case "text":
                this.component = <Text />
                break;
            default: 
                return null;
        }

        return ( 
            <div id="modal-div" className="modal-background" onClick={closeModal}>
                <div className="modal-child" onClick={(e) => e.stopPropagation()}>
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




