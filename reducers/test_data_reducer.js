import { RECEIVE_TEST_DATA, RESET_TEST_DATA, REMOVE_TEST_DATA } from '../actions/test_data_actions';


const testDataReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TEST_DATA:
            return Object.assign({}, state, action.data);
        case RESET_TEST_DATA: 
            return [];
        case REMOVE_TEST_DATA: 
            let newArr = Object.assign({}, state);
            delete newArr[action.id]
            return newArr;
        default:
            return state;
    }
}

export default testDataReducer;