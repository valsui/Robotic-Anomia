import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="page-header">
                <div className="title-container">
                    <h1 className="page-title">Welcome to Robotic Anomia</h1>
                    <a className="github-link" href="https://github.com/valsui/Robotic-Anomia">
                        <i className="fab fa-github-square"></i>
                    </a>
                </div>
            </header>
        )
    }
}

export default Header;