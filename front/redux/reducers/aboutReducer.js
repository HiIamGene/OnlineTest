export const SET_ABOUT_DP  = "SET_ABOUT_DP";
export const SET_ABOUT_DP_EDIT  = "SET_ABOUT_DP_EDIT";


const initState = {
    dps: {},
    dp: {
        mode: false,
        certificateNumber: "",
        issueAuthority: "",
        issueDate: "",
        expiryDate: "",
        limitation: "",
        type: "",
        attachDocumentation : []
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_ABOUT_DP: {
            return {
                ...state,
                dps: action.payload,
            };
        }
        case SET_ABOUT_DP_EDIT: {
            return {
                ...state,
                dp: {
                    ...state.dp,
                    mode: "add",
                    ...action.payload
                }
            };
        }
        default:
            return state
    }
};