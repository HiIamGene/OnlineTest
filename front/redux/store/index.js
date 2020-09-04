import { createStore,applyMiddleware  } from "redux";
import rootReducer from "../reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const initStore = (initialState = {}) => {
    return createStore(
        rootReducer,
        initialState,
        process.env.NODE_ENV !== 'production' ? composeWithDevTools(applyMiddleware (thunk)) : applyMiddleware (thunk)
    )
};
