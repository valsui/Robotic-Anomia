export const RECEIVE_TEST_DATA = "RECEIVE_TEST_DATA";
export const RESET_TEST_DATA = "RESET_TEST_DATA";
export const RECEIVE_OUTPUT_DATA = "RECEIVE_OUTPUT_DATA";
export const REMOVE_TEST_DATA = "REMOVE_TEST_DATA";
export const RECEIVE_ARRAY_SHAPES = "RECEIVE_ARRAY_SHAPES";
export const RESET_OUTPUT_DATA = "RESET_OUTPUT_DATA";

export const receiveTestData = (data) => ({
    type: RECEIVE_TEST_DATA,
    data
})

export const resetTestData = () => ({
    type: RESET_TEST_DATA
})

export const removeTestData = (id) => ({
    type: REMOVE_TEST_DATA,
    id
})

export const receiveOutputData = (data) => ({
    type: RECEIVE_OUTPUT_DATA,
    data
})

export const receiveArrayShapes = data => ({
    type: RECEIVE_ARRAY_SHAPES,
    data
})

export const resetOutputData = () => ({
    type: RESET_OUTPUT_DATA
})
