import { combineReducers } from 'redux';
import signinReducer from './signin';

export default combineReducers({
    signin: signinReducer
});