import cookie from "js-cookie";
import {logout} from "../../utils/auth";

export const LOGIN  = "LOGIN";
export const LOGOUT  = "LOGOUT";


const initState = {
    isLogin: false,
    token: null,
};

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN: {
            cookie.set('token', action.payload, { path: '/' });

            return {
                ...state,
                isLogin: true,
                token: action.payload,
            };
        }

        case LOGOUT: {
            logout();
            return {
                ...state,
                isLogin: false,
                token: null,
            };
        }
        default:
            return state
    }
};