import {API_CALL_STATUS, reducerBuilder} from "../master/baseReducer";
import ActionType from "./actionType";
import {combineReducers} from "redux";

const cartInfoRes = reducerBuilder(ActionType.CART_SUCCESS, ActionType.CART_FAILED, ActionType.CART_PENDING)

export default combineReducers({
  cartInfoRes,
});

export const selectCart = (state) => state.cartReducer.cartInfoRes;
export const selectCartInfo = (state) => {
  const res = selectCart(state)
  return res && res.data && res.data.data
}
