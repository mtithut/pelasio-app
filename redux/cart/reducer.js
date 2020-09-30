import {API_CALL_STATUS, reducerBuilder} from "../master/baseReducer";
import ActionType from "./actionType";
import {combineReducers} from "redux";
import {getErrorMessage} from "../../components/utility/respMessageHandler";

const cartInfoRes = reducerBuilder(ActionType.CART_SUCCESS, ActionType.CART_FAILED, ActionType.CART_PENDING, ActionType.CART_INITIAL)
const changeCartRes = reducerBuilder(ActionType.CHANGE_CART_SUCCESS, ActionType.CHANGE_CART_FAILED, ActionType.CHANGE_CART_PENDING, ActionType.CHANGE_CART_INITIAL)

export default combineReducers({
  cartInfoRes,
  changeCartRes,
});

export const selectCart = (state) => state.cartReducer.cartInfoRes;
export const selectCartInfo = (state) => {
  const res = selectCart(state)
  return res && res.data && res.data.data
}
export const selectChangeCart = (state) => state.cartReducer.changeCartRes;

export const changeCartStatus = (state) => {
  const res = selectChangeCart(state)
  const isSuccess = res.status === API_CALL_STATUS.SUCCESS
  const isFailed = res.status === API_CALL_STATUS.FAILED

  return {isSuccess: isSuccess, isFailed: isFailed, data: res}
}
