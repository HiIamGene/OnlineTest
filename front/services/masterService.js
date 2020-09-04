import axios from 'axios';
import API from "../constant/ENV";

/**
 * ================ Company ================
 */
export const masterCompanyFields = {
    image: "",
    englishName: "",
    localName: "",
    location: "",
    locationSearch: false,
};

export const fetchMasterCompnay = async (name) => {
    const res = await axios.get(API.MASTER.COMPANY_V020000 + (name ? "?name=" + name : ""));
    return res.data.payload.companies;
};
export const storeMasterCompany = async (payload) => {
    const res = await axios.post(API.MASTER.COMPANY_V020000, payload);
    return res.data.payload.company;
};

/**
 * ================ Company ================
 */

export const masterShipFields = {
    "image": "",
    "englishName": "",
    "localName": "",
    "description": "",
    "city": "",
    "country": "",
    "yearBuilt": "",
    "dwt": "",
    "nrt": "",
    "grt": "",
    "vesselType": "",
    "companyId": ""

};
export const fetchMasterShip = async (name) => {
    const res = await axios.get(API.MASTER.SHIP_V020000 + (name ? "?name=" + name : ""));
    return res.data.payload.ships;
};
export const storeMasterShip = async (payload) => {
    const res = await axios.post(API.MASTER.SHIP_V020000, payload);
    return res.data.payload.ship;
};

/**
 * ================ Rank ================
 */
export const fetchMasterRank = async (name) => {
    const res = await axios.get(API.MASTER.RANK_V020000 + (name ? "?name=" + name : ""));
    return res.data.payload.ranks;
};
export const fetchMasterMajor = async (name) => {
    const res = await axios.get(API.MASTER.MAJOR_V020000 + (name ? "?name=" + name : ""));
    return res.data.payload.majors;
};

export const fetchMasterWorkscore = async (name) => {
    const res = await axios.get(API.MASTER.WORKSCORE_V020000 + (name ? "?name=" + name : ""));
    return res.data.payload.workscores;
};

/**
 * ================ SOFT SKILL ================
 */
export const fetchMasterSoftSkill = async (name) => {
    const res = await axios.get(API.MASTER.SOFT_SKILL_V010000 + (name ? "?softskillName=" + name : ""));
    return res.data.payload.softSkill;
};
export const fetchUserSoftSkill = async () => {
    const res = await axios.get(API.USER.PROFILE.SKILL.SOFT_SKILL_V020000);
    return res.data;
};
export const putUserSoftSkill = async (id,score) => {
    try{
        await axios.put(API.USER.PROFILE.SKILL.SOFT_SKILL_V020000,[{
            "userSkillId": id,
            "score": score
    }]);
    }
    catch (e){
        // console.log("Error : " + e.response.data.message);
    }
};

export const fetchUserHardSkill = async () => {
    const res = await axios.get(API.USER.PROFILE.SKILL.HARD_SKILL_V010000);
    return res.data;
};
export const putUserHardSkill = async (id,score) => {
    try{
        await axios.put(API.USER.PROFILE.SKILL.HARD_SKILL_V010000,[{
            "userSkillId": id,
            "score": score
    }]);
    }
    catch (e){
        // console.log("Error : " + e.response.data.message);
    }
};