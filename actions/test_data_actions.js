export const RECEIVE_TEST_DATA = "RECEIVE_TEST_DATA";
export const RESET_TEST_DATA = "RESET_TEST_DATA";

export const receiveTestData = (data) => ({
    type: RECEIVE_TEST_DATA,
    data
})

export const resetTestData = () => ({
    type: RESET_TEST_DATA
})