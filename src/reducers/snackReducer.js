export function snackReducer(state = {open:false, message: ""}, action){
    switch(action.type){
        case "SET_SNACK":
            return action.payload;
        default:
            return state;
    }
}