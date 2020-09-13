import counterReducer from './reducer';
import {combineReducers} from 'redux';
import signupReducer from '../signup/reducer'

const rootReducer = combineReducers({
  signupReducer
});

export default rootReducer;