export const ADD_ABOUT = "ADD_ABOUT"
export const EDIT_ABOUT = "EDIT_ABOUT"

const initState = {
}

export default (state = initState, action) => {
    switch(action.type) {
        default : 
            return state
        case ADD_ABOUT : {
            return {
                ...action.payload
            }
        }
    }
}