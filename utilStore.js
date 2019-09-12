import { createStore} from 'redux';
import NetworkReducer from './src/reducers'

const utilStore = createStore(NetworkReducer)

export default utilStore;