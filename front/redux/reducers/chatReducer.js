export const ADD_ROOM = "ADD_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";
export const EMPTY_ROOM = "EMPTY_ROOM";
export const ADD_CURRENT_ROOM = "ADD_CURRENT_ROOM";
export const CHAT_ROOM_DATA = "CHAT_ROOM_DATA";
export const VIDEO_CALL_COUNT = "VIDEO_CALL_COUNT";
export const SET_CHAT_SHOW = "SET_CHAT_SHOW";
export const SET_MEMBER = "SET_MEMBER";
export const SET_MEMBER_KICK = "SET_MEMBER_KICK";
export const SET_CHAT_HEADER = "SET_CHAT_HEADER";
const initialChatState = {
    data: [],
    currentData: {},
    chatRoomData: {},
    videoCallCount: 0,
    isChatShow: false,
    currentMember: {},
    memberUserId: [],
    isKick: "",
    chatHeader: "Chat"
};

const chatReducer = (state = initialChatState, action) => {
    switch (action.type) {
        case ADD_ROOM:
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].name == action.payload.name) {
                    state.data.splice(i, 1);
                }
            }
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case DELETE_ROOM: {
            console.log(state.data);
            state.data.splice(action.payload, 1);
            console.log(state.data);
            return { ...state };
        }
        case ADD_CURRENT_ROOM: {
            return {
                ...state,
                currentData: action.payload
            };
        }
        case VIDEO_CALL_COUNT: {
            return {
                ...state,
                count: state.count + action.payload
            };
        }
        case CHAT_ROOM_DATA: {
            return {
                ...state,
                chatRoomData: action.payload
            };
        }
        case EMPTY_ROOM: {
            return {
                data: []
            };
        }
        case SET_CHAT_SHOW: {
            return {
                isChatShow: action.payload
            };
        }
        case SET_MEMBER: {
            return {
                ...state,
                currentMember: action.payload
            };
        }
        case SET_MEMBER_KICK: {
            return {
                ...state,
                memberUserId: state.memberUserId.concat(action.payload.userId),
                isKick: action.payload.isKick
            };
        }
        case SET_CHAT_HEADER: {
            return {
                ...state,
                chatHeader: action.payload
            };
        }
        default:
            return state;
    }
};
export default chatReducer;
