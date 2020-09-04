import axios from 'axios';
import {
    API_USER_PROFILE_CALENDAR,
} from "../constant/ENV";
import dayjs from 'dayjs';

export const getCalendar = async (y = dayjs().format("YYYY"),m = null, d = null)=>{
    try {
        return (await axios.get(API_USER_PROFILE_CALENDAR+"?year="+y+(m ? "&month="+m : "")+(d ? "&day="+d : ""))).data.payload.calendar;
    } catch (e) {
        return e;
    }
};