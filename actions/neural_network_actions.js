export const RECEIVE_NEURAL_NETWORK = "RECEIVE_NEURAL_NETWORK";
export const SELECT_TRAINED_NETWORK = "SELECT_TRAINED_NETWORK";
export const SELECT_NEW_NETWORK = "SELECT_NEW_NEWORK";
export const RESET_CURRENT_NETWORK = "RESET_CURRENT_NETWORK";


// dispatch an empty neural network to the reducer for the user to train in local storage.  
// should not modify our existing neural network that is trained.
export const receiveNeuralNetwork = net => ({
    type: RECEIVE_NEURAL_NETWORK,
    net
})

export const selectTrainedNetwork = () => {
    return ({
        type: SELECT_TRAINED_NETWORK
    })
}

export const selectNewNetwork = () => ({
    type: SELECT_NEW_NETWORK
})

export const resetCurrentNetwork = () => ({
    type: RESET_CURRENT_NETWORK
})