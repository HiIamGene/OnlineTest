import { v4 as uuid } from "uuid";
const data = {
    detail: {
        "topic": "",
        "description": "",
        "dateStart": "",
        "timeStart": "",
        "duration": ""
    },
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
    // { "id": uuid(), "groupName": "aaa", "numQuestion": "0", "maxQuestion": "0", "score": "", "question": [{ "id": "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55", "question": "การออกแบบUI" }] },
    /*
  "31ded736-4076-4b1c-b38f-7e8d9fa78b41": {
"name": "จงเลือกคำตอบที่ถูกที่สุด",
"items": [
  { "id": "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55", "groupName": "การออกแบบUI", "numQuestion": "5",maxQuestion:"","score": "6" ,"question":[]},
  { "id": "17acf9a1-b2c7-46c6-b975-759b9d9f538d", "groupName": "สีกับความรู้สึก", "numQuestion": "2",maxQuestion:"", "score": "4" ,"question":[]},
},
"115f7d04-3075-408a-b8ce-c6e46fe6053f": {
"name": "",
"items": []
},
"9bcf1415-3a41-43b6-a871-8de1939a75c4": {
"name": "",
"items": []
}
};
 */
    groups: {}

    ,

    groupsTestbank: [{
        "id": "115f7d04-3075-408a-b8ce-c6e46fe6053f",
        "groupName": "การออกแบบUI",
        "questionList": [
            { "questionID": "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55", "question": "การออกแบบUI" },
            { "questionID": "c7ac5b7f-59b0-45e3-82fb-abcdefc05f02", "question": "Test Question 6" }
        ]
    }
    ],
    questionsTestbank:
        [
            {
                "questionID": "c7ac5b7f-59b0-45e3-82fb-b3b0afc05f55",
                "groupID": "115f7d04-3075-408a-b8ce-c6e46fe6053f",
                "question": "การออกแบบUI",
                "type": "",
                "data": "",
                "choice": []
            },
            {
                "questionID": "c7ac5b7f-59b0-45e3-82fb-abcdefc05f02",
                "groupID": "115f7d04-3075-408a-b8ce-c6e46fe6053f",
                "question": "Test Question 6",
                "type": "",
                "data": "",
                "choice": []
            }
        ]
    ,
    value: "",
    groupSelect: "",
    draft: "true",
    maxQuestion: 0,
    currentQuestion: 0,
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

