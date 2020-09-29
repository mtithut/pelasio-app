import ActionType from './actionType'
import Api from '../../api'
import {
  removeCartId,
  setCartId,
  setExpiresTime,
  setTokenAccess,
  setTokenDurationTime,
  setUser
} from "../../components/localStorage";

export const cleanLoginState = () => (dispatch) => {
  dispatch({type: ActionType.LOGIN_INITIAL})
}
export const login = (username, password) => (dispatch) => {
  dispatch({type: ActionType.LOGIN_PENDING})
  Api.login(username, password)
    .then(res => {
      res && initUserTokenInfo(res.data)
      /*if (res && res.data && res.data) {
        setTokenAccess(res.data.access_token)

        if (res.data.user) {
          res.data.user.cart_id && setCartId(res.data.user.cart_id)
          setUser(JSON.stringify(res.data.user))
        }

        const date = new Date()
        res.data.expires_in && setExpiresTime((date.getTime() / 1000) + parseInt(res.data.expires_in)) //set expire time of token
        res.data.expires_in && setTokenDurationTime(parseInt(res.data.expires_in)) //set duration time of token
      }*/
      dispatch({type: ActionType.LOGIN_SUCCESS, payload: res})
    })
    .catch(error => {
        console.log('error', error)
        dispatch({type: ActionType.LOGIN_FAILED, payload: error})
      }
    )
};

export const resetRegister = () => (dispatch) => {
  dispatch({type: ActionType.REGISTER_INITIAL})
}
export const register = (firstname, lastname, email, country, password, passwordRep) => (dispatch) => {
  dispatch({type: ActionType.REGISTER_PENDING})
  Api.register(firstname, lastname, email, country, password, passwordRep)
    .then(data => dispatch({type: ActionType.REGISTER_SUCCESS, payload: data}))
    .catch(error => dispatch({type: ActionType.REGISTER_FAILED, payload: error})
    )
};

export const getGustToken = () => (dispatch) => {
  dispatch({type: ActionType.GUST_TOKEN_PENDING})
  Api.getGustToken()
    .then(res => {
      res && res.data && res.data && setTokenAccess(res.data.access_token)
      res && res.data && res.data && res.data.cart_id && setCartId(res.data.cart_id)
      dispatch({type: ActionType.GUST_TOKEN_SUCCESS, payload: res})
    })
    .catch(error => dispatch({type: ActionType.GUST_TOKEN_FAILED, payload: error})
    )
};


export const refreshToken = () => (dispatch) => {
  dispatch({type: ActionType.REFRESH_TOKEN_PENDING})
  Api.refreshToken()
    .then(res => {
      res && initUserTokenInfo(res.data)
      dispatch({type: ActionType.REFRESH_TOKEN_SUCCESS, payload: res})
    })
    .catch(error => dispatch({type: ActionType.REFRESH_TOKEN_FAILED, payload: error})
    )
};

function initUserTokenInfo(data) {
  if (data) {
    console.log('initUserTokenInfo:', data)
    setTokenAccess(data.access_token)

    if (data.user) {
      data.user.cart_id ? setCartId(data.user.cart_id) : removeCartId()
      setUser(JSON.stringify(data.user))
    }

    const date = new Date()
    data.expires_in && setExpiresTime(parseInt((date.getTime() / 1000) + parseInt(data.expires_in))) //set expire time of token
    data.expires_in && setTokenDurationTime(parseInt(data.expires_in)) //set duration time of token
  }

}