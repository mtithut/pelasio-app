import {combineReducers} from 'redux';
import signupReducer from '../signup/reducer'
import cartReducer from '../cart/reducer'

const rootReducer = combineReducers({
  signupReducer, cartReducer
});

export default rootReducer;