import { combineReducers } from 'redux';
import signinReducer from './signin';
import signupReducer from './signup';
import appointmentReducer from './appointment';
import tattooReducer from './tattoo';
import notificationReducer from './notification';
import aboutReducer from './about';

export default combineReducers({
    signin: signinReducer,
    signup: signupReducer,
    appointment: appointmentReducer,
    tattoo: tattooReducer,
    notification: notificationReducer,
    about: aboutReducer
});