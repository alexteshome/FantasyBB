import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import playersReducer from "./playersReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  players: playersReducer
});
