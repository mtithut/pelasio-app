import {API_CALL_STATUS, reducerBuilder} from "../master/baseReducer";
import ActionType from "./actionType";
import {combineReducers} from "redux";

const initialStateCart = {
  cartInfo: {},
}

const cartInfoRes = (state = initialStateCart, action = {}) => {
  switch (action.type) {
    case ActionType.ADD_CART_INFO:
      return Object.assign({}, state, {cartInfo: action.payload});
    default:
      return state;
  }
}


export default combineReducers({
  cartInfoRes,
});

export const selectCartInfo = (state) => state.cartReducer.cartInfoRes.cartInfo;
