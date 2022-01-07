import { combineReducers } from "redux";
import useReducer from './useReducer';


const reducer = combineReducers({
    user : useReducer,
})

export default reducer ; 
