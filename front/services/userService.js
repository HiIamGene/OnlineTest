import { API_USER_FRIEND_CHECK,API_USER_PROFILE_ANOTHER_FRIEND_LIST,API_USER_ENDORSE,API_USER_FRIEND_UNFRIEND, API_USER_PROFILE_ADD_ANOTHER_PROFILE, API_USER_PROFILE_REQUEST_LIST, API_USER_PROFILE_REACT_REQUEST, API_USER_PROFILE_FRIEND_LIST } from '../constant/ENV';
import axios from 'axios';

export const addFriend = async (id) => {
    // console.log("income ID : ",id)
    try {
        let res = await axios.post(API_USER_PROFILE_ADD_ANOTHER_PROFILE, {
            "userId": id
        })
        return res;
    } catch (e) {
        // console.log("addFriend error : ",e);
    }
}
export const unFriend = async (id) => {
    // console.log("income ID : ",id)
    try {
        let res = await axios.delete(API_USER_FRIEND_UNFRIEND + '/' + id)
        return res;
    } catch (e) {
        //console.log("unFriend error : ",e);
    }
}
export const checkRequest = async () => {
    try {
        let data = await axios.get(API_USER_PROFILE_REQUEST_LIST);
        return data.data.payload;
    }
    catch (e) {
        console.log(e);
    }
}
export const friendList = async (page, perPage) => {
    try {
        let url = ''
        if(page !== undefined && perPage !== undefined) {
            url = `${API_USER_PROFILE_FRIEND_LIST}?page=${page}&perPage=${perPage}`
        }
        else {
            url = API_USER_PROFILE_FRIEND_LIST
        }
        let data = await axios.get(url);
        return data.data.payload;
    }
    catch (e) {
        console.log(e.data.payload);
    }
}
export const anotherFriendList = async (id) => {
    try {
        let data = await axios.get(API_USER_PROFILE_ANOTHER_FRIEND_LIST+id);
        return data.data.payload;
    }
    catch (e) {
        //console.log(e.data.payload);
    }
}

export const acceptFriend = async (id, data) => {

    try {
        await axios.put(API_USER_PROFILE_REACT_REQUEST + "/" + id, {
            "reactType": data
        });
    }
    catch (e) {
        // console.log("Accept react : ", e);
    }
}
export const sendEndorse = async (id, type,knowAbout,actionDegree) => {

    try {
        await axios.post(API_USER_ENDORSE + "/" + id, {
            type: type,
            knowAbout: knowAbout,
            actionDegree: actionDegree
        });
    }
    catch (e) {
        // console.log("Accept react : ", e);
    }
}
export const checkFriend = async (id) => {

    try {
        let data= await axios.get(API_USER_FRIEND_CHECK  + id);
        return data.data.payload.isFriend;
    }
    catch (e) {
        // console.log("Accept react : ", e);
    }
}
