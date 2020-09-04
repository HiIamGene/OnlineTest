import axios from "axios";
import {API_MASTER_COUNTRY_V010001, API_MASTER_NATIONALITY_V010001} from "../constant/ENV";

export const fetchMasterCountry = async ()=>{
    try {
        return (await axios.get(API_MASTER_COUNTRY_V010001)).data.payload.countries;
    } catch (e) {
        return e;
    }
};

export const fetchMasterNationality = async ()=>{
    try {
        return (await axios.get(API_MASTER_NATIONALITY_V010001)).data.payload;
    } catch (e) {
        return e;
    }
};