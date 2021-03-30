import { v4 as uuid } from "uuid";
const data = {
    groupTestList:[],
    selectColumn: []
}

//export const countReducer = function (state=data, action) {
export default (state = data, action) => {
    // console.log(action)
    switch (action.type) {
        case "setGroupTestList":
            return { ...state, groupTestList: action.groupTestList };
        case "setSelectColumn":
            return { ...state, selectColumn: action.selectColumn };
        default:
            return state;
    }
};

