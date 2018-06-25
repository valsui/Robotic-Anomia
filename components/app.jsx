import React from 'react';
import Modal from './modal/modal';
import Header from './header/header';
import TrainingCanvas from './canvas/training_canvas';
import TestingCanvas from './canvas/testing_canvas';

const App = () => {
    return (
        <div className="main-body">
            <Header />
            <TrainingCanvas />
            <TestingCanvas />
            <Modal />
        </div>
    )
}

export default App;