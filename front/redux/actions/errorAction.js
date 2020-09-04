import { ERROR } from "../reducers/errorReducer";

export const setError = (isError)=>{
    return (dispatch)=>{
        dispatch({
            type: ERROR,
            payload: isError
        })
    }
}