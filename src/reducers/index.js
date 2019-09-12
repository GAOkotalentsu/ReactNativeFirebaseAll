import { combineReducers } from 'redux';
import userReducer from './userReducer';
import NetworkReducer from './networkReducer';


export default combineReducers({
    //api things will be saved here in posts
    userReducer,
    NetworkReducer
})
