const data ={count:0,value:""}
//export const countReducer = function (state=data, action) {
export default (state=data, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {...state,count:state.count+1};
        case "DECREMENT":
            return  {...state,count:state.count-1};
        case "change":

            return  {...state,value:action.value};
        default:
            return state;
    }
};