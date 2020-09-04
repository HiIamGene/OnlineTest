export const SET_MASTER_COUNTRY  = "SET_MASTER_COUNTRY";
export const SET_MASTER_NATIONALITY  = "SET_MASTER_NATIONALITY";

const initState = {
    countries: [],
    nationalities: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_MASTER_COUNTRY: {
            return {
                ...state,
                countries: action.payload
            };
        }

        case SET_MASTER_NATIONALITY: {
            return {
                ...state,
                nationalities: action.payload
            };
        }

        default:
            return state
    }
};