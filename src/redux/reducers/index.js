import { combineReducers } from "redux";
import commonReducer from "./postReducer";

const rootReducer = combineReducers({commonReducer})

export default rootReducer;