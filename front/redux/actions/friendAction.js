import {SET} from '../reducers/friendReducer';
import {_error_handler} from "../../utils/errorHandler";

export const setPop = (data) => dispatch =>{
    // console.log("setPop : ", data);
    dispatch({
        type: SET,
        payload: data
    })
}