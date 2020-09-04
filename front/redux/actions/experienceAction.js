import {
    SET_EXPERIENCES,
    SET_EXPERIENCE,
    SET_EXPERIENCE_COMPANY_MASTER, SET_EXPERIENCE_MAJOR_MASTER,
    SET_EXPERIENCE_RANK_MASTER, SET_EXPERIENCE_WORKSCORE_MASTER, EDIT_EXPERIENCE, ADD_EXPERIENCE, VIEW_EXPERIENCE
} from "../reducers/experienceReducer";

export const setExperiences = payload => dispatch => {
    return dispatch({
        type: SET_EXPERIENCES,
        payload
    });
};

export const addExperience = () => dispatch => {
    return dispatch({
        type: ADD_EXPERIENCE,
    });
};

export const viewExperience = () => dispatch => {
    return dispatch({
        type: VIEW_EXPERIENCE,
    });
};

export const setExperience = payload => dispatch => {
    return dispatch({
        type: SET_EXPERIENCE,
        payload
    });
};

export const editExperience = payload => dispatch => {
    return dispatch({
        type: EDIT_EXPERIENCE,
        payload
    });
};

export const setCompanyMaster = payload => dispatch => {
    return dispatch({
        type: SET_EXPERIENCE_COMPANY_MASTER,
        payload
    });
};

export const setRankMaster = payload => dispatch => {
    return dispatch({
        type: SET_EXPERIENCE_RANK_MASTER,
        payload
    });
};

export const setMajorMaster = payload => dispatch => {
    return dispatch({
        type: SET_EXPERIENCE_MAJOR_MASTER,
        payload
    });
};

export const setWorkscoreMaster = payload => dispatch => {
    return dispatch({
        type: SET_EXPERIENCE_WORKSCORE_MASTER,
        payload
    });
};