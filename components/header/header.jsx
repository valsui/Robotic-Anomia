import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

class Header extends React.Component {


    render() {
        const { openModal } = this.props;

        return (
            <header className="page-header">
                <div className="title-container">
                    <h1 className="page-title">Welcome to Robotic Anomia</h1>
                    <div className="header-icon-container">
                        <a className="github-link" href="https://github.com/valsui/Robotic-Anomia">
                            <i className="fab fa-github-square"></i>
                        </a>
                            <i className="fas fa-info-circle" onClick={() => openModal("devBios")}></i>
                    </div>
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    openModal: (formType) => dispatch(openModal(formType))
})



export default (connect(null, mapDispatchToProps)(Header));