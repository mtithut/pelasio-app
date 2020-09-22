import {combineReducers} from 'redux';
import authReducer from '../auth/reducer'
import cartReducer from '../cart/reducer'

const rootReducer = combineReducers({
  authReducer, cartReducer,
});

export default rootReducer;