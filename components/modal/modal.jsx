import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import DevBios from "./dev_bios";
import DoneTraining from './done_training';
import Text from './text';
import LoadMachine from './LoadMachine';
import TrainingInfo from './TrainingInfo';
import TestingInfo from './TestingInfo';

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
            case "LoadMachine":
                this.component = <LoadMachine />
                break; 
            case "trainingInfo":
                this.component = <TrainingInfo />
                break;
            case "testingInfo":
                this.component = <TestingInfo />
                break;

            default:
                return null;
        }

        return (
            <div id="modal-div" className="modal-background" onClick={closeModal}>
                <div className="modal-child" >
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
