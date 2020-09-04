import axios from 'axios';
import {API_USER_PROFILE_DP_V010001,} from "../constant/ENV";

/**
 * ================ DP Qualification ================
 */
export const fetchAboutDp = async ()=>{
    try {
        return (await axios.get(API_USER_PROFILE_DP_V010001)).data.payload.dps;
    } catch (e) {
        return e;
    }
};

export const storeAboutDp = async (payload)=>{
    try {
        return await axios.post(API_USER_PROFILE_DP_V010001,payload);
    } catch (e) {
        return e;
    }
};

export const updateAboutDp = async (payload)=>{
    try {
        return await axios.put(API_USER_PROFILE_DP_V010001+"/"+payload.id,payload);
    } catch (e) {
        return e;
    }
};

export const destroyAboutDp = async (payload)=>{
    try {
        return await axios.delete(API_USER_PROFILE_DP_V010001+"/"+payload.id,payload);
    } catch (e) {
        return e;
    }
};

