import React from 'react';

class DevBios extends React.Component {
    render() {
        return (
            <div className="dev-bios-container">
                <div className="dev-bios-text">
                    Robotic Anomia is a project developed by a group of four App Academy students after 2 months of rigorous learning.  Prior to App Academy, most of the group had little to no experience in programming, and even less experience in machine learning.  They decided to tackle on a project in constructing neural networks, and quickly found that the literature involved was very abstract and often did not explain the subject matter in an interesting way.  In order to better understand what each part of the neural network was actually doing, they posed the question: "What would happen if we took this part out?"  Thus, Robotic Anomia was born, a project that allows the user to interact with a functional neural network in order to see exactly what each part in the pipeline is doing by removing it from the equation.  
                </div>
                <ul className="dev-bios-ul">
                    <h2 className="dev-bios-header"> Developers </h2>
                    <li className="dev-bios-li"> Dan Luo </li>
                    <li className="dev-bios-li"> Patrick Wang </li>
                    <li className="dev-bios-li"> Valerie Sui </li>
                    <li className="dev-bios-li"> Xiang Yu An </li>
                </ul>
            </div>
        )
    }
}

export default DevBios;