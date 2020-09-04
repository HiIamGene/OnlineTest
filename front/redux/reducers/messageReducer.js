export const SET_MESSAGE_OF_CHAT = "SET_MESSAGE_OF_CHAT"
export const DELETE_MESSAGE_OF_CHAT = "DELETE_MESSAGE_OF_CHAT"

const initialMessageState = {
    messages: [],
}

const messageReducer = (state = initialMessageState,action)=>{
    switch(action.type){
        case SET_MESSAGE_OF_CHAT : {
            // // console.log("messageReducer worked");
            let {chatRoom,message} = action.payload;
            // // console.log("chatRoom : ",chatRoom);
            // // console.log("message : ",message);
            if(!(chatRoom in state.messages)){
                state.messages[chatRoom] = []
            }
            return{
                ...state,
                messages : {
                    ...state.messages,
                    [chatRoom] : [...state.messages[chatRoom],message]
                }
            }
        }
        case DELETE_MESSAGE_OF_CHAT : {
            let id = action.payload;
            delete state.messages[id];
            return {...state}
        }
        default : {
            return state
        }
    }
}
export default messageReducer;