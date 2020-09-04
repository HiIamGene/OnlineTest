import{SET_MESSAGE_OF_CHAT,DELETE_MESSAGE_OF_CHAT} from "../reducers/messageReducer"

export const setMessageOfChat = (data) => dispatch => {
    return dispatch ({
        type: SET_MESSAGE_OF_CHAT,
        payload : data
    })
}
export const deleteMessageOfChat = (id) => dispatch => {
    return dispatch ({
        type: DELETE_MESSAGE_OF_CHAT,
        payload : id
    })
}