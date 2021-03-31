const data = {
    headers: {

    },
    selectTest: {},
    questionsTestbank:[]
    
}

//export const countReducer = function (state=data, action) {
export default (state = data, action) => {
    // console.log(action)
    switch (action.type) {
        case "setStateHeaders":
            return { ...state, headers: action.headers };
        case "setSelectTest":
            return { ...state, selectTest: action.selectTest };
            case "setQuestionsTestbank":
            return { ...state, questionsTestbank: action.questionsTestbank };
        default:
            return state;
    }
};

