import { v4 as uuid } from "uuid";
const data = {
    selectColumn: []
}

//export const countReducer = function (state=data, action) {
export default (state = data, action) => {
    // console.log(action)
    switch (action.type) {
        case "setSelectColumn":
            return { ...state, selectColumn: action.selectColumn };
        default:
            return state;
    }
};

