export const CHANGE_LANGE  = "CHANGE_LANG"


 const initLanguagesState = {
    lang:"TH"
}

const languagesReducer = (state = initLanguagesState, action) => {
    switch (action.type) {
        case CHANGE_LANGE:
            if(action.lang === "en"){
                return {...state,lang:"en"}
            }
            else{
                return {...state,lang:"th"}
            }
        default:
            return state
    }
}

export default languagesReducer