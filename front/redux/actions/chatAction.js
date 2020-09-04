import { ADD_ROOM, DELETE_ROOM, EMPTY_ROOM, ADD_CURRENT_ROOM, CHAT_ROOM_DATA, VIDEO_CALL_COUNT, SET_CHAT_SHOW, SET_MEMBER, SET_MEMBER_KICK, SET_CHAT_HEADER } from "../reducers/chatReducer"

export const addRoom = (data) => dispatch => {
    return dispatch({
        type: ADD_ROOM,
        payload: data
    });
};
export const deleteRoom = (data) => dispatch => {
    return dispatch({
        type: DELETE_ROOM,
        payload: data
    });
};
export const emptyRoom = () => dispatch => {
    return dispatch({
        type: EMPTY_ROOM,
    });
};
export const addCurrentRoom = (data) => dispatch => {
    return dispatch({
        type: ADD_CURRENT_ROOM,
        payload: data
    });
};
export const setChatRoomData = (data) => dispatch => {
    return dispatch({
        type: CHAT_ROOM_DATA,
        payload: data
    });
};
export const setVideoCount = (count) => dispatch => {
    return dispatch({
        type: VIDEO_CALL_COUNT,
        payload: count
    });
};
export const setChatShow = (isChatShow) => dispatch => {
    return dispatch({
        type: SET_CHAT_SHOW,
        payload: isChatShow
    });
};
export const setMember = (member) => dispatch => {
    return dispatch({
        type: SET_MEMBER,
        payload: member
    });
};
export const setMemberKickRemove = (data) => dispatch => {
    return dispatch({
        type: SET_MEMBER_KICK,
        payload: data
    });
};
export const setChatHeader = (chatHeader) => dispatch => {
    return dispatch({
        type: SET_CHAT_HEADER,
        payload: chatHeader
    });
};