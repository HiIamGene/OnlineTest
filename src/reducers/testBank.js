import { v4 as uuid } from "uuid";
const data = {
    groupTestList:[],
    selectColumn: {questionList:[]},
    questionsTestbank:[],
    currentQuestion:0
}

//export const countReducer = function (state=data, action) {
export default (state = data, action) => {
    // console.log(action)
    switch (action.type) {
        case "setGroupTestList":
            return { ...state, groupTestList: action.groupTestList };
        case "setSelectColumn":
            return { ...state, selectColumn: action.selectColumn };
        case "setCurrentQuestion":
            return { ...state, currentQuestion: action.currentQuestion };
        case "setQuestionsTestbank":
            return { ...state, questionTestbank: action.questionTestbank };
        default:
            return state;
    }
};

