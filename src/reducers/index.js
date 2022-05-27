import { combineReducers } from "redux";
import {userReducer} from "./userReducer";
import {loaderReducer} from "./loaderReducer";
import {cartReducer} from "./cartReducer";
import {drawerReducer} from "./drawerReducer";
import { snackReducer } from "./snackReducer";
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
    user: userReducer,
    loader:loaderReducer,
    cart:cartReducer, 
    drawer:drawerReducer,
    snack: snackReducer,
    search: searchReducer
});

export default rootReducer;