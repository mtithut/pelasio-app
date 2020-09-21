import ActionType from './actionType'
import Api from '../../api'

export const setCartInfo = (cartInfo) => ({type: ActionType.ADD_CART_INFO, payload: cartInfo})