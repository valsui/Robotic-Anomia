import React from 'react';

class DevBios extends React.Component {
    render() {
        return (
            <div className="dev-bios-container">
                <div className="dev-bios-text">
                    Robotic Anomia is a project developed by a group of four App Academy students after 2 months of rigorous learning.  Prior to App Academy, most of the group had little to no experience in programming, and even less experience in machine learning.  They decided to tackle on a project in constructing neural networks, and quickly found that the literature involved was very abstract and often did not explain the subject matter in an interesting way.  Thus, Robotic Anomia was born.  Our project allows users to use our trained network or build their own networks from scratch to recognize their handwriting. 
                </div>
                <br/>
                <br/>
                <ul className="dev-bios-ul">
                    <h2 className="dev-bios-header"> Developers </h2>
                    <br/>
                    <li className="dev-bios-li"> Dan Luo  <a className="profile-github" href="https://github.com/pichumy">
                        <i className="fab fa-github-square"></i>
                    </a></li>
                    <li className="dev-bios-li"> Patrick Wang <a className="profile-github" href="https://github.com/patrickw098">
                        <i className="fab fa-github-square"></i>
                    </a></li>
                    <li className="dev-bios-li"> Valerie Sui <a className="profile-github" href="https://github.com/valsui">
                        <i className="fab fa-github-square"></i>
                    </a></li>
                    <li className="dev-bios-li"> Xiang Yu An <a className="profile-github" href="https://github.com/1a2b3c4dBobAn">
                        <i className="fab fa-github-square"></i>
                    </a></li>
                </ul>
            </div>
        )
    }
}

export default DevBios;
