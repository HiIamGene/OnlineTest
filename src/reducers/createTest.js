const data = {
    headers: {
        },
    value: ""
}
//export const countReducer = function (state=data, action) {
export default (state = data, action) => {
    switch (action.func) {
        case "setStateHeaders":
            return { ...state, headers: action.headers };
        case "DECREMENT":
            return { ...state, count: state.count - 1 };
        case "change":
            return { ...state, value: action.value };
        default:
            return state;
    }
};