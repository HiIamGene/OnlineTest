import { v4 as uuid } from "uuid";
const data = {
    headers: {
        [uuid()]: {
            "name": "asdasdasda",
            "items": [
                {
                    "id": "115f7d04-3075-408a-b8ce-c6e46fe6053f",
                    "groupName": "การออกแบบUI",
                    "numQuestion": "0",
                    "maxQuestion": "0",
                    "score": "",
                    "questionList": [
                        { "questionID": "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55", "question": "การออกแบบUI" },
                        { "questionID": "c7ac5b7f-59b0-45e3-82fb-abcdefc05f02", "question": "Test Question 6" }
                    ]
                }

            ]
        },
    },
}

//export const countReducer = function (state=data, action) {
export default (state = data, action) => {
    // console.log(action)
    switch (action.type) {
        case "setStateHeaders":
            return { ...state, headers: action.headers };
        case "setStateGroups":
            return { ...state, groupsTestbank: action.groupsTestbank };
        case "setStateGroupSelect":
            return { ...state, groupSelect: action.groupSelect };
        case "updateDetail":
            return { ...state, detail: action.detail };
        case "setGroups":
            return { ...state, groups: action.groups };
        case "setMaxQuestion":
            return { ...state, maxQuestion: action.maxQuestion };
        case "setCurrentQuestion":
            return { ...state, currentQuestion: action.currentQuestion };
        case "setQuestionsTestbank":
            return { ...state, questionsTestbank: action.questionsTestbank }
        case "setDraft":
            return { ...state, draft: action.draft }
        default:
            return state;
    }
};

