import {SET_PROFILE} from "../reducers/profileReducer"
import {FETCH_PROFILE} from "../reducers/profileReducer"
import { API_USER_PROFILE_V010001 } from './../../constant/ENV';
import axios from "axios"
import {_error_handler} from "../../utils/errorHandler";

export const setProfile = (data) => dispatch => {
    return dispatch({
        type: SET_PROFILE,
        payload:data
    })
}

export const fetchProfile = () => async dispatch => {
    try {
      const url = API_USER_PROFILE_V010001;
      const res = await axios.get(url)
      dispatch({
        type: SET_PROFILE,
        payload:res.data.payload
    });
    } catch (error) {
      _error_handler(null,error,null)
      
    }
  }
  