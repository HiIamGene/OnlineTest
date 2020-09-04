import {
    SET_CALENDAR,
} from "../reducers/personalReducer";

export const setCalendar = payload => dispatch => {
    return dispatch({
        type: SET_CALENDAR,
        payload
    });
};
