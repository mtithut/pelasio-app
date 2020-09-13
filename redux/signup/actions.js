import ActionType from './actionType'
import Api from '../../components/utility/api.js'

export const login = (username, password) => (dispatch) => {
  alert('')
  dispatch({type: ActionType.LOGIN_PENDING})
  Api.login(username, password)
    .then(data => dispatch({type: ActionType.LOGIN_SUCCESS, deploy: data}))
    .catch(error => dispatch({type: ActionType.LOGIN_FAILED, deploy: error})
    )
};

export const register = (firstname, lastname, email, country, password, passwordRep) => (dispatch) => {
  dispatch({type: ActionType.REGISTER_PENDING})
  Api.register(firstname, lastname, email, country, password, passwordRep)
    .then(data => dispatch({type: ActionType.REGISTER_SUCCESS, deploy: data}))
    .catch(error => dispatch({type: ActionType.REGISTER_FAILED, deploy: error})
    )
};