export const RECEIVE_NEURAL_NETWORK = "RECEIVE_NEURAL_NETWORK";


// dispatch an empty neural network to the reducer for the user to train in local storage.  
// should not modify our existing neural network that is trained.
export const receiveNeuralNetwork = net => ({
    type: RECEIVE_NEURAL_NETWORK,
    net
})