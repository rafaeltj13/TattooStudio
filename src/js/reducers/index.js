import { combineReducers } from 'redux';
import signinReducer from './signin';
import signupReducer from './signup';
import notificationReducer from './notification';

export default combineReducers({
    signin: signinReducer,
    signup: signupReducer,
    notification: notificationReducer
});