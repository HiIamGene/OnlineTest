import axios from "axios";
import API from "../constant/ENV";

export const uploadFile = async ({file,category,path})=>{
    let reader = new FileReader();
    let response = await new Promise((resolve,reject)=>{
        reader.onload = async (upload) => {
            const inputData = {
                file: upload.target.result,
                path: category,
                device: "WWW"
            };
            try {
                let res = await axios.post(API.SERVICE.UPLOAD_V010000 + "/"+path, {...inputData});
                resolve(res);
            } catch (e) {
                reject(e);
            }
        };
        reader.readAsDataURL(file);
    });
    return response.data.payload;
};