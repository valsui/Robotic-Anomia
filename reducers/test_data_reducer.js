import { RECEIVE_TEST_DATA, RESET_TEST_DATA } from '../actions/test_data_actions';


const testDataReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TEST_DATA:
            return state.concat([action.data]);
        case RESET_TEST_DATA: 
            return [];
        default:
            return state;
    }
}

export default testDataReducer;