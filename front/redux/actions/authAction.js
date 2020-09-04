import {LOGIN, LOGOUT} from "../reducers/authReducer";
import {setSocket,setChatSocket} from "./socketAction";
import {emptyRoom} from "./chatAction"
import socketIOClient from "socket.io-client";
import API from "../../constant/ENV";

export const login = token => dispatch => {
    if(process.browser){
        const socket = socketIOClient(API.SOCKET.USER,{
            query:{authorization: token}
        });
        setSocket(socket)(dispatch);
        const chat_socket = socketIOClient(API.SOCKET.MESSAGE,{
            query:{authorization: token}
        });
        setChatSocket(chat_socket)(dispatch);
    }
    return dispatch({
        type: LOGIN,
        payload: token
    });
};

export const logout = () => dispatch => {
    if(process.browser) {
        setSocket(null)(dispatch);
        setChatSocket(null)(dispatch);
        emptyRoom()(dispatch);
    }
    return dispatch({
        type: LOGOUT,
    });
};