//for defining all types of actions like fetch data
import { UPDATE_TOKEN, UPDATE_USER } from '../action/types';

const initialState = {
    user: {},
    token: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            console.log("updating token " + action.payload);
            return {
                ...state,
                token: action.payload
            };
        case UPDATE_USER:
            let userTemp = action.payload;
            console.log("from user reducer action.payload" + userTemp);
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;