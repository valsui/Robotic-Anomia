import React from 'react';
import Modal from './modal/modal';
import Header from './header/header';
import TrainingCanvas from './canvas/training_canvas';
import TestingCanvas from './canvas/testing_canvas';
import Output from './displays/outputs';

const App = () => {
    return (
        <div className="main-body">
            <Header />
            <TrainingCanvas />
            <TestingCanvas />
            <Modal />
            <Output />
        </div>
    )
}

export default App;