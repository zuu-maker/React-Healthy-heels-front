export function loaderReducer(state = false, action){
    switch(action.type){
        case "SET_LOADER":
            return action.payload;
        default:
            return state;
    }
}