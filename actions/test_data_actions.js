export const RECEIVE_TEST_DATA = "RECEIVE_TEST_DATA";
export const RESET_TEST_DATA = "RESET_TEST_DATA";
export const RECEIVE_OUTPUT_DATA = "RECEIVE_OUTPUT_DATA";

export const receiveTestData = (data) => ({
    type: RECEIVE_TEST_DATA,
    data
})

export const resetTestData = () => ({
    type: RESET_TEST_DATA
})

export const receiveOutputData = (data) => ({
    type: RECEIVE_OUTPUT_DATA,
    data
})
