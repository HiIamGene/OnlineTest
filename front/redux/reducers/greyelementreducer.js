const initElementstate = {
    paddingdiv : 0
}

const greyelementreducer = (state = initElementstate,action) =>{
    switch(action.type){
        case "ADD" :
            state.paddingdiv = 120;
            break;
        case "SUBSTRACT" :
            state.paddingdiv = 0;
            break;
        default:
            return state;
    }
}

export default greyelementreducer;