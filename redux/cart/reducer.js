import {API_CALL_STATUS, reducerBuilder} from "../master/baseReducer";
import ActionType from "./actionType";
import {combineReducers} from "redux";

const cartInfoRes = reducerBuilder(ActionType.CART_SUCCESS, ActionType.CART_FAILED, ActionType.CART_PENDING, ActionType.CART_INITIAL)
const increaseCartRes = reducerBuilder(ActionType.INCREASE_CART_SUCCESS, ActionType.INCREASE_CART_FAILED, ActionType.INCREASE_CART_PENDING, ActionType.INCREASE_CART_INITIAL)
const decreaseCartRes = reducerBuilder(ActionType.DECREASE_CART_SUCCESS, ActionType.DECREASE_CART_FAILED, ActionType.DECREASE_CART_PENDING, ActionType.DECREASE_CART_INITIAL)
const deleteCartRes = reducerBuilder(ActionType.DELETE_CART_SUCCESS, ActionType.DELETE_CART_FAILED, ActionType.DELETE_CART_PENDING, ActionType.DELETE_CART_INITIAL)

export default combineReducers({
  cartInfoRes,
  increaseCartRes,
  decreaseCartRes,
  deleteCartRes
});

export const selectCart = (state) => state.cartReducer.cartInfoRes;
export const selectCartInfo = (state) => {
  const res = selectCart(state)
  return res && res.data && res.data.data
}
export const selectIncreaseCart = (state) => state.cartReducer.increaseCartRes;

export const increaseCartStatus = (state) => selectIncreaseCart(state).status

export const selectDecreaseCart = (state) => state.cartReducer.decreaseCartRes;
export const decreaseCartStatus = (state) => selectDecreaseCart(state).status

export const selectDeleteCart = (state) => state.cartReducer.deleteCartRes;
export const deleteCartStatus = (state) => selectDeleteCart(state).status
