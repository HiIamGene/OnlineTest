export const SET_USER_SOCKET  = "SET_USER_SOCKET";
export const SET_MESSAGE_SOCKET  = "SET_MESSAGE_SOCKET";

const initState = {
    userSocket: null,
    chatSocket: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_USER_SOCKET: {
            if(!action.payload && !!state.userSocket){
                state.userSocket.disconnect();
            }

            return {
                ...state,
                userSocket: action.payload
            };
        }
        case SET_MESSAGE_SOCKET: {
            if(!action.payload && !!state.chatSocket){
                state.chatSocket.disconnect();
            }
            return {
                ...state,
                chatSocket: action.payload
            };
        }
        default:
            return state
    }
};