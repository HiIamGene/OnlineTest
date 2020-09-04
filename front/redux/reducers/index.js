import { combineReducers } from "redux";
import languagesReducer from "./languagesReducer";
import profileReducer from "./profileReducer";
import experienceReducer from "./experienceReducer";
import authReducer from "./authReducer";
import personalReducer from "./personalReducer";
import utilReducer from "./utilReducer";
import aboutReducer from "./aboutReducer";
import feedReducer from "./feedReducer";
import friendReducer from "./friendReducer";
import socketReducer from "./socketReducer";
import chatReducer from "./chatReducer";
import messageReducer from "./messageReducer";
import aboutProfileReducer from "./aboutProfileReducer";
import dataReducer from "./dataReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    languagesReducer,
    profileReducer,
    experienceReducer,
    authReducer,
    personalReducer,
    utilReducer,
    aboutReducer,
    feedReducer,
    friendReducer,
    socketReducer,
    chatReducer,
    messageReducer,
    aboutProfileReducer,
    dataReducer,
    errorReducer
});
