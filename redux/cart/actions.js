import ActionType from './actionType'
import Api from '../../api'
import {getTokenAccess} from "../../components/localStorage";

export const addToCart = (itemId, quality) => (dispatch) => {
  dispatch({type: ActionType.CART_PENDING})
  Api.addToCart(itemId, quality)
    .then(data => dispatch({type: ActionType.CART_SUCCESS, payload: data}))
    .catch(error => {
        console.log('error', error)
        dispatch({type: ActionType.CART_FAILED, payload: error})
      }
    )
};

export const cartIncrease = (cartId, itemId) => (dispatch) => {
  dispatch({type: ActionType.CART_PENDING})
  Api.cartIncreaseItem(cartId, itemId)
    .then(data => dispatch({type: ActionType.CART_SUCCESS, payload: data}))
    .catch(error => {
        console.log('error', error)
        dispatch({type: ActionType.CART_FAILED, payload: error})
      }
    )
};

export const cartDecrease = (cartId, itemId) => (dispatch) => {
  dispatch({type: ActionType.CART_PENDING})
  Api.cartDecreaseItem(cartId, itemId)
    .then(data => dispatch({type: ActionType.CART_SUCCESS, payload: data}))
    .catch(error => {
        console.log('error', error)
        dispatch({type: ActionType.CART_FAILED, payload: error})
      }
    )
};


export const cartDelete = (cartId, itemId) => (dispatch) => {
  dispatch({type: ActionType.CART_PENDING})
  Api.cartsDeleteItem(cartId, itemId)
    .then(data => dispatch({type: ActionType.CART_SUCCESS, payload: data}))
    .catch(error => {
        console.log('error', error)
        dispatch({type: ActionType.CART_FAILED, payload: error})
      }
    )
};

export const cartRefresh = (cartId, country, lang) => (dispatch) => {
  dispatch({type: ActionType.CART_PENDING})
  Api.cartsRefresh(cartId, country, lang)
    .then(data => dispatch({type: ActionType.CART_SUCCESS, payload: data}))
    .catch(error => {
        console.log('error', error)
        dispatch({type: ActionType.CART_FAILED, payload: error})
      }
    )
};