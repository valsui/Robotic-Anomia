export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const RECEIVE_TEXT = "RECEIVE_TEXT";

export const openModal = component => ({
    type: OPEN_MODAL,
    component
})

export const closeModal = () => ({
    type: CLOSE_MODAL
})

export const receiveText = text => ({
    type: RECEIVE_TEXT,
    text
})