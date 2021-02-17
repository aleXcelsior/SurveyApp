import { combineReducers } from "redux";

import authReducer from "./authReducer";

//this sets the name on the "state" to auth.
export default combineReducers({ auth: authReducer });
