import React from 'react';
import { connect } from 'react-redux';

class TestingInfo extends React.Component{
    render(){
        <div className = 'testing-info-modal'>
            Our neural network was trained on thousands of lower case letters that were drawn on an HTML canvas. We used our own algorithm inspired by 
            <a href='https://medium.com/@ageitgey/machine-learning-is-fun-part-3-deep-learning-and-convolutional-neural-networks-f40359318721'>convolution</a> to augment the canvas, pulling out the distinctive features of of the letter, and ultimately transforming it into an array of weighted values based on the the canvas strokes. The network was built using the <a href="https://github.com/BrainJS/brain.js#more-examples">brain.js</a> library which is a lightweight Neural Network library in JavaScript. 
            <br/>
            Training a neural network consists of a series of actions known as forward and backward propogation. The weights of the network are initialized during the initial iteration of forward propogation. At each layer of the network, an <a href="https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6">activation function </a> gets applied to the linear combination of the weights and the previous layer, resulting in an output layer that resembled a probability. The errors (actual - guess) are calculated at the final output layer. A loss (typically the mean-squared-error) is evaluated and then optimized using the method of gradient descent during the the backwards propogation. The ultimate goal of backpropagation is to adjust the weights in each layer of the neural network in order to minimize the loss.
            Our data was used to train a deep neural network with multiple hidden layers using the 
            <a href="https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6">sigmoid activation function </a>
            with a <a href="https://en.wikipedia.org/wiki/Mean_squared_error">mean squared error</a> 
            <a href="https://en.wikipedia.org/wiki/Backpropagation#Loss_function">loss function</a>. 
            <br/>
            Each time a user draws on the canvas, the canvas is transformed with our algorithm into a 1x625 array and goes through one pass of forward propogation where the output layer reveals the likelihood of each letter. The letter with the highest value is what the network recognized the input to be.
            
        </div>
    }
}

export default TestingInfo;