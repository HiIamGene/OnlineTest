import axios from 'axios';
import API from "../constant/ENV";



export const fetchExperience = async ()=>{
    return (await axios.get(API.USER.PROFILE.EXPERIENCE_V010001)).data.payload.experiences;
};
export const storeExperience = async (payload)=>{
    const res = await axios.post(API.USER.PROFILE.EXPERIENCE_V010001,payload);
    return res.data.payload.experience;
};
export const updateExperience = async (payload)=>{
    const res = await axios.put(API.USER.PROFILE.EXPERIENCE_V010001+"/"+payload.id,payload);
    return res.data.payload.experience;
};
export const destroyExperience = async (id)=>{
    const res = await axios.delete(API.USER.PROFILE.EXPERIENCE_V010001+"/"+id);
    return res.data;
};