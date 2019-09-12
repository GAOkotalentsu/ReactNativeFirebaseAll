import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './src/reducers'

const middleware = [thunk];
const userStore = createStore(userReducer)

export default userStore;