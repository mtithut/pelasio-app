import {apiCallReducerBuilder} from "../master/reducer";
import ActionType from "./actionType";
import {combineReducers} from "redux";
import counterReducer from "../reducers/reducer";

const loginResp = apiCallReducerBuilder(ActionType.LOGIN_SUCCESS, ActionType.LOGIN_FAILED, ActionType.LOGIN_PENDING)
const registerResp = apiCallReducerBuilder(ActionType.REGISTER_SUCCESS, ActionType.REGISTER_FAILED, ActionType.REGISTER_PENDING)

export default combineReducers({
  loginResp,
  registerResp
});

export const selectLogin = (state) => state.signupReducer.loginResp;
export const selectRegister = (state) => state.signupReducer.registerResp;