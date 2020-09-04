export const SET_CALENDAR  = "SET_CALENDAR";


const initState = {
    calendars: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_CALENDAR: {
            return {
                ...state,
                calendars: action.payload,
            };
        }
        default:
            return state
    }
};