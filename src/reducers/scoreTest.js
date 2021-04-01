import { v4 as uuid } from "uuid";
const data = {
    headerlist: [],
    header: {},
    test: {},
    studentList: [],
    scoreQuestion: null,
    student: {},
    currentQuestion: 0
}

//export const countReducer = function (state=data, action) {
export default (state = data, action) => {
    // console.log(action)
    switch (action.type) {
        case "setHeaderlist":
            return { ...state, headerlist: action.headerlist };
        case "setHeader":
            return { ...state, header: action.header };
        case "setTest":
            return { ...state, test: action.test };
        case "setStudentList":
            return { ...state, studentList: action.studentList };
        case "setStudent":
            return { ...state, student: action.student };
        case "setScoreQuestion":
            return { ...state, scoreQuestion: action.scoreQuestion };
        case "setCurrentQuestion":
            return { ...state, currentQuestion: action.currentQuestion };
        default:
            return state;
    }
};

