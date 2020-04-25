import * as actionType from "../actions/actionType";
import { combineReducers } from "redux";

const reducer_user = async (state = {}, action) => {
    let newState;
    switch(action.type){
        case actionType.SHOW_USER:
            newState = action.data;
            return newState;
        default:
        return state;
    }
}

const reducer_product = async (state = {}, action) => {
    let newState;
    switch(action.type){
        case actionType.SHOW_PRODUCT:
            newState = action.data;
            return newState;
        default:
        return state;
    }
}

const userApp = combineReducers({
    user: reducer_user,
    product: reducer_product
})



export default userApp;