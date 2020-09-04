import {API_USER_SEARCH_FRIENDS_V010001} from '../constant/ENV';
import axios from 'axios';

export const getUser = async (searchData)=>{
    const res = await axios.get(API_USER_SEARCH_FRIENDS_V010001 +"?nameUser="+ searchData);
    return res.data.payload.user;
}