import {SET_USER_SOCKET,SET_MESSAGE_SOCKET} from "../reducers/socketReducer";

export const setSocket = socket => dispatch => {
    return dispatch({
        type: SET_USER_SOCKET,
        payload: socket
    });
};
export const setChatSocket = socket => dispatch => {
    return dispatch({
        type: SET_MESSAGE_SOCKET,
        payload: socket
    });
};