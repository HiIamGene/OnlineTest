import {
    ADD_ABOUT,
    EDIT_ABOUT
} from "../reducers/aboutProfileReducer"

export const setAboutProfile = (payload) => (dispatch) =>{
    return dispatch({
        type: ADD_ABOUT,
        payload: payload
    })
}