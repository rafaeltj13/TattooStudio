import { combineReducers } from 'redux';
import signinReducer from './signin';
import signupReducer from './signup';
import appointmentReducer from './appointment';
import notificationReducer from './notification';

export default combineReducers({
    signin: signinReducer,
    signup: signupReducer,
    appointment: appointmentReducer,
    notification: notificationReducer
});