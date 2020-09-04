import {
    SET_ABOUT_DP,
    SET_ABOUT_DP_EDIT
} from "../reducers/aboutReducer";

export const setAboutDp = payload => dispatch => {
    return dispatch({
        type: SET_ABOUT_DP,
        payload
    });
};

export const setAboutDpEdit= payload => dispatch => {
    return dispatch({
        type: SET_ABOUT_DP_EDIT,
        payload
    });
};