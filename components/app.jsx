import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Modal from './modal/modal';
import Header from './header/header';
import TrainingView from './views/training_view';
import TestingView from './views/testing_view';
import Homepage from './views/homepage';


const App = () => {
    return (
        <div className="main-body">
            <Header />
                <Switch>
                    <Route exact path="/test" component={TestingView} />
                    <Route exact path="/train" component={TrainingView} />
                    <Route exact path="/" component={Homepage} />
                    <Redirect to="/" />
                </Switch>
            <Modal />
        </div>
    )
}

export default App;