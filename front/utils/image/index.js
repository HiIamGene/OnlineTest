import axios from "axios";

export const imageWithToken = (imgUrl) =>{
    const token = axios.defaults.headers.common['Authorization']
    return `${imgUrl}?token=${token}`
}