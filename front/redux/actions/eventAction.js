import { SET_INPUT_FOCUS,SET_EVENT } from "../reducers/eventReducer";

export const setInputFocus = (isFocus)=>{
    return (dispatch)=>{
        dispatch({
            type: SET_INPUT_FOCUS,
            payload: isFocus
        })
    }
}

export const setEvent = (event)=>{
    return (dispatch)=>{
        dispatch({
            type: SET_EVENT,
            payload: event
        })
    }
}