import {API_CALL_STATUS, reducerBuilder} from "../master/baseReducer";
import ActionType from "./actionType";
import {combineReducers} from "redux";

const loginResp = reducerBuilder(ActionType.LOGIN_SUCCESS, ActionType.LOGIN_FAILED, ActionType.LOGIN_PENDING, ActionType.LOGIN_INITIAL)
const registerResp = reducerBuilder(ActionType.REGISTER_SUCCESS, ActionType.REGISTER_FAILED, ActionType.REGISTER_PENDING, ActionType.REGISTER_INITIAL)
const gustTokenResp = reducerBuilder(ActionType.GUST_TOKEN_SUCCESS, ActionType.GUST_TOKEN_FAILED, ActionType.GUST_TOKEN_PENDING)
const refreshTokenResp = reducerBuilder(ActionType.REFRESH_TOKEN_SUCCESS, ActionType.REFRESH_TOKEN_FAILED, ActionType.REFRESH_TOKEN_PENDING)

export default combineReducers({
  loginResp,
  registerResp,
  gustTokenResp,
  refreshTokenResp
});

export const selectLogin = (state) => state.authReducer.loginResp;
export const selectUserinfo = (state) => {
  const res = selectLogin(state)
  return res && res.data && res.data.data && res.data.data.user
}
export const isLoginSuccess = (state) => selectLogin(state).status === API_CALL_STATUS.SUCCESS
export const isLoginFailed = (state) => selectLogin(state).status === API_CALL_STATUS.FAILED

export const selectRegister = (state) => state.authReducer.registerResp;
export const isRegisterSuccess = (state) => selectRegister(state).status === API_CALL_STATUS.SUCCESS
export const isRegisterFailed = (state) => selectRegister(state).status === API_CALL_STATUS.FAILED

export const selectGustToken = (state) => state.authReducer.gustTokenResp;
export const selectGustTokenInfo = (state) => {
  const res = selectGustToken(state)
  return res && res.data && res.data.data
}
export const selectRefreshToken = (state) => state.authReducer.refreshTokenResp;
export const selectRefreshTokenInfo = (state) => {
  const res = selectRefreshToken(state)
  return res && res.data && res.data.data
}
export const isRefreshTokenSuccess = (state) => selectRefreshToken(state).status === API_CALL_STATUS.SUCCESS