import { POST } from "../reducers/dataReducer"

export const addPost = (payload) => (dispatch) => {
    return dispatch({
        type: POST,
        payload: payload
    })
}