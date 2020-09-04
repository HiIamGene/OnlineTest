import {SET_MASTER_COUNTRY, SET_MASTER_NATIONALITY} from "../reducers/utilReducer";

export const setMasterCountry = (data) => dispatch => {
    return dispatch({
        type: SET_MASTER_COUNTRY,
        payload:data
    })
};

export const setMasterNationality= (data) => dispatch => {
    return dispatch({
        type: SET_MASTER_NATIONALITY,
        payload:data
    })
};