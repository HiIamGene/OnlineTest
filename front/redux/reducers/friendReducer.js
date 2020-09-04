export const SET = "SET"
const initialFriendState = {
        "invite": 0,
        "friend": 0,
        "company": 0
}

const friendReducer = (state = initialFriendState,action) =>{
    switch(action.type){
        case SET : 
            return {...state,...action.payload}
        default:
            return state
    }
}
export default friendReducer