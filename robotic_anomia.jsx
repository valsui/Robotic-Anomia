import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import net from './javascripts/trained_net.js';
import Root from './components/root';
// import  model  from './tensorflow/tensor_flow_attempt2';
import  model  from './tensorflow/tensor_flow_attempt';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const store = configureStore();

    window.store = store;
    window.model = model;
    // window.model1 = model1;
    console.log(model);
    ReactDOM.render(<Root store={store} />, root);
})


// window.net = net;
// console.log(outputa, outputb, outputl, outpute);
