import {logout} from "../auth";

export const _error_handler = (toast,err,ctx=null) => {
    if(err.response && typeof window !== 'undefined'){
        const statusCode = err.response.status
        if(statusCode == 401){
            if (toast !==null)
                toast.add(err.response.data.message, { appearance: 'error' ,autoDismiss: true});
            logout(ctx)
        }else if (statusCode >= 400 && statusCode < 500){
            let payload =  err.response.data.payload;
            if(payload){
                Object.keys(payload).map(key=>{
                    if (toast !==null)
                        toast.add(payload[key], { appearance: 'error' ,autoDismiss: true});
                })
            }else{
                if (toast !==null){
                    if(err.response.data.message){
                        toast.add(err.response.data.message, { appearance: 'error' ,autoDismiss: true});
                    } else if(err.response.data.messages) {
                        Object.keys(err.response.data.messages).map(key=>{
                            if (toast !==null)
                                toast.add(err.response.data.messages[key], { appearance: 'error' ,autoDismiss: true});
                        })
                    }
                }

            }
        }else if (statusCode >= 500 && statusCode < 600){
            if (toast !==null)
                toast.add("Server Unavailable", { appearance: 'error' ,autoDismiss: true});
        }
        // console.log("Axios Req Error : ",err.response)
    }else{
        if (toast !==null)
            toast.add("Server Unavailable", { appearance: 'error' ,autoDismiss: true});
        // console.log("Axios Req Error : ",err)
    }

};
