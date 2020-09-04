import {CHANGE_LANGE} from "../reducers/languagesReducer";

export const changeLanguages = (lang) => dispatch => {
    return dispatch({
        type: CHANGE_LANGE,
        lang
    })
}
