import React from 'react';
import Modal from './modal/modal';
import Header from './header/header';
import TrainingCanvas from './canvas/training_canvas';

const App = () => {
    return (
        <div className="main-body">
            <Header />
            <TrainingCanvas />
            <Modal />
        </div>
    )
}

export default App;