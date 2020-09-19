import ActionType from './actionType'
import Api from '../../api'

export const resetLogin = () => (dispatch) => {
  dispatch({type: ActionType.LOGIN_INITIAL})
}
export const login = (username, password) => (dispatch) => {
  dispatch({type: ActionType.LOGIN_PENDING})
  Api.login(username, password)
    .then(data => dispatch({type: ActionType.LOGIN_SUCCESS, payload: data}))
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