import {API_CALL_STATUS, reducerBuilder} from "../master/baseReducer";
import ActionType from "./actionType";
import {combineReducers} from "redux";

const loginResp = reducerBuilder(ActionType.LOGIN_SUCCESS, ActionType.LOGIN_FAILED, ActionType.LOGIN_PENDING)
const registerResp = reducerBuilder(ActionType.REGISTER_SUCCESS, ActionType.REGISTER_FAILED, ActionType.REGISTER_PENDING)

export default combineReducers({
  loginResp,
  registerResp
});

export const selectLogin = (state) => state.signupReducer.loginResp;
export const isLoginSuccess = (state) => selectLogin(state).status === API_CALL_STATUS.SUCCESS
export const isLoginFailed = (state) => selectLogin(state).status === API_CALL_STATUS.FAILED

export const selectRegister = (state) => state.signupReducer.registerResp;
export const isRegisterSuccess = (state) => selectRegister(state).status === API_CALL_STATUS.SUCCESS
export const isRegisterFailed = (state) => selectRegister(state).status === API_CALL_STATUS.FAILED